import React, { useCallback, useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, query, collection, getDocs, orderBy, onSnapshot } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
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
      if(!nweet) return
      await addDoc(collection(dbService, "nweets"), {
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
        <button type="submit">Nweet</button>
      </form>
      <div>
        {nweets &&
          nweets.map(({ id, text }) => (
            <div key={id}>
              <h4>{text}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
