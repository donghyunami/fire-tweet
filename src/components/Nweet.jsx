import { dbService, deService } from "fbase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [editNweet, setEditNweet] = useState(nweetObj.text);

  const nweetRef = doc(dbService, "nweets", `${nweetObj.id}`);

  const onDeleteClick = async (e) => {
    const ok = window.confirm("Nweet를 정말로 삭제할건가요?");

    if (ok) {
      ok && (await deleteDoc(nweetRef));
    }
  };

  const onUpdatetoggleEditing = () => setEditing((prev) => !prev);
  const onChangeEditNweet = (e) => {
    const { value } = e.target;
    setEditNweet(value);
  };
  const onSubmitUpdate = async (e) => {
    e.preventDefault();

    const nweetRef = doc(dbService, "nweets", `${nweetObj.id}`);
    await updateDoc(nweetRef, {
      text: editNweet || nweetObj.text,
    });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmitUpdate}>
            <input
              type="text"
              value={editNweet}
              required
              onChange={onChangeEditNweet}
              placeholder="수정할 내용을 입력해주세요"
            />
          <button onClick={onSubmitUpdate}>Edit</button>
          </form>
          <button onClick={onUpdatetoggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={onUpdatetoggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
