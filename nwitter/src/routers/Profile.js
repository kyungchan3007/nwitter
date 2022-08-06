import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../firebase";

export default ({ userObject }) => {
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

  useEffect(() => {
    getMyNweets();
  });

  return (
    <>
      <button onClick={onLogOutClick}>log out</button>
    </>
  );
};
