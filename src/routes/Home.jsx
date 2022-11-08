import React, { useEffect, useState, useRef } from "react";
import { dbService } from "fbase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetForm from "components/NweetForm";

const Home = ({ userObj }) => {
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

  return (
    <div>
      <NweetForm userObj={userObj}/>
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
