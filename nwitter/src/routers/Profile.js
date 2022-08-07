import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../firebase";

export default ({ userObject }) => {
  const [newDisplayName, setDisplayName] = useState(userObject.displayName);
  const [newPhotoUrl, setPhotoUrl] = useState(userObject.photoURL);
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObject.uid)
      .orderBy("createdAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };
  const onChangeDisplay = (e) => {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  };

  // const onChangeTest = (e) => {
  //   const {
  //     target: { value },
  //   } = e;
  //   console.log(e.target.value);
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObject.displayName !== newDisplayName) {
      await userObject.updateProfile({
        displayName: newDisplayName,
      });
    }
  };

  useEffect(() => {
    getMyNweets();
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChangeDisplay}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value={"Update Profile"} />
        <img src={newPhotoUrl} />
      </form>
      <button onClick={onLogOutClick}>log out</button>
    </>
  );
};
