import { dbService, deService } from "fbase";
import { doc, updateDoc, deleteDoc, getFirestore } from "firebase/firestore";
import { storageService } from "../fbase";
import { deleteObject, ref } from "firebase/storage";

import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const { id, text, imgSrc } = nweetObj;

  const [editing, setEditing] = useState(false);
  const [editNweet, setEditNweet] = useState(text);

  const nweetRef = doc(dbService, "nweets", `${id}`);

  const onDeleteClick = async (e) => {
    const ok = window.confirm("Nweet를 정말로 삭제할건가요?");

    if (ok) {
      ok && (await deleteDoc(nweetRef));
      const imgFileRef = ref(storageService, imgSrc);
      await deleteObject(imgFileRef);
    }
  };

  const onUpdatetoggleEditing = () => setEditing((prev) => !prev);
  const onChangeEditNweet = (e) => {
    const { value } = e.target;
    setEditNweet(value);
  };
  const onSubmitUpdate = async (e) => {
    e.preventDefault();

    const nweetRef = doc(dbService, "nweets", `${id}`);
    await updateDoc(nweetRef, {
      text: editNweet || text,
    });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        isOwner && (
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
        )
      ) : (
        <>
          <h4>{text}</h4>
          {imgSrc && (
            <img src={imgSrc} alt="nweet-img" width="50px" height="50px" />
          )}
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
