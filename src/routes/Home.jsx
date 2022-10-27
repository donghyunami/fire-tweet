import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  addDoc,
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    try {
      if (!nweet) return;
      await addDoc(nweetsCollectionRef, {
        creatorId: userObj.uid,
        text: nweet,
        createdAt: Date.now(),
      });
      setNweet("");
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
    const { files } = e.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.addEventListener("loadend", (e) => {
      const { result } = e.currentTarget;
      setAttachment(result);
    });
    reader.readAsDataURL(theFile);
  };

  const onClickClearattachment = (e) => setAttachment("");

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
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <button type="submit">Nweet</button>
        {attachment && (
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
