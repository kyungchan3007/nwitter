import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService } from "../firebase";

const Home = ({ userObject }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [isfile, setIsFile] = useState();
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
    // getNweets();
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); // reRander 안됨 , forEach 사용시 리렌더 됨
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      // 프로미스 반환
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObject.uid,
    });
    setNweet("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setIsFile(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearPhotClick = () => {
    setIsFile(null);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {isfile && (
          <div>
            <img src={isfile} width="50px" height={"50px"} />
            <button onClick={onClearPhotClick}>Clean image</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet, index) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObject.uid} // props(userObject)
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
