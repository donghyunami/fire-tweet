import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useState, useRef } from "react";
import { dbService, storageService } from "fbase";
import {
  addDoc,
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const fileInputRef = useRef(null);

  const nweetsCollectionRef = collection(dbService, "nweets");

  useEffect(() => {
    const q = query(
      nweetsCollectionRef,
      orderBy("createdAt", "desc") //최신순(최신 업로드한 내용이 상단부터)
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";

    if (!nweet) return;

    try {
      // 이미지를 첨부하는 경우 storage에 업로드
      if (attachment  !== "") {
        // storage에 파일 업로드
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const imageRef = await uploadString(fileRef, attachment, "data_url");
        console.log(imageRef)

        // storage에 파일 url 다운로드
        attachmentUrl = await getDownloadURL(imageRef.ref);
      }

      // Firestore(db)에 업로드
      const nweetObj = {
        creatorId: userObj.uid,
        text: nweet,
        createdAt: Date.now(),
        imgSrc: attachmentUrl
      };
      
      await addDoc(nweetsCollectionRef, nweetObj);

      setNweet("");
      setAttachment("");
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setNweet(value);
  };

  const onChangeFile = (e) => {
    console.dir(e.target)
    const { files } = e.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.addEventListener("loadend", (e) => {
      const { result } = e.currentTarget;
      setAttachment(result);
    });
    reader.readAsDataURL(theFile);
  };

  const onClickClearattachment = (e) => {
    fileInputRef.current.value = '';
    setAttachment("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="무슨 생각을 하고 있나요?"
          maxLength={120}
        />
        <input type="file" accept="image/*" ref={fileInputRef} onChange={onChangeFile} />
        <button type="submit">Nweet</button>

        {attachment && (
        /* 이미지 미리보기 */
          <div>
            <img src={attachment} alt="" width="50px" height="50px" />
            <button onClick={onClickClearattachment}>clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets &&
          nweets.map((nweet) => (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
