import React, { useState } from "react";
import { dbService, storageService } from "../firebase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.imageUrl).delete();
    }
  };

  const toggleEditing = () => setEdit((prev) => !prev);

  const onSubmit = async (e) => {
    console.log(nweetObj.id);
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEdit(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value={"Update Nweet"} />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.imageUrl && (
            <img src={nweetObj.imageUrl} width="50px" height="50px" />
          )}

          <>
            <button onClick={onDeleteClick}>Delete Nweet</button>
            <button onClick={toggleEditing}>Edit Nweet</button>
          </>
        </>
      )}
    </div>
  );
};

export default Nweet;
