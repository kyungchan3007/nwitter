import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService, storageService } from "../firebase";

import NweetFactory from "../components/NweetFactory";
const Home = ({ userObject }) => {
  const [nweets, setNweets] = useState([]);

  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection("nweets").get();
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(), //데이터 내용물
  //       id: document.id,
  //     };
  //     setNweets((prev) => [nweetObject, ...prev]); // 이배열에서 첫번째 요소는 최근 document , 그뒤로는 이전 document
  //   });
  // };

  useEffect(() => {
    //getNweets();
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); //reRander 안됨 , forEach 사용시 리렌더 됨
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObject={userObject} />
      <div>
        {nweets.map((nweet, index) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.id === userObject.uid} // props(userObject)
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
