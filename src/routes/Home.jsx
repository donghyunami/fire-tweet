import React, { useCallback, useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, query, collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = useCallback(async () => {
    const nweetsCollectionRef = collection(dbService, "nweets");
    const dbNweets = await getDocs(query(nweetsCollectionRef));
    const getData = dbNweets.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setNweets(getData);
  }, []);

  useEffect(() => {
    getNweets();
  }, [getNweets]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        nweet,
        createdAt: Date.now(),
      });
      docRef && alert("추가되었습니다.");
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
        {nweets.length === 0 && <div>로딩중...</div>}
        {nweets && nweets.map(({id, nweet})=> (
          <div key={id}>
            <h4>{nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
