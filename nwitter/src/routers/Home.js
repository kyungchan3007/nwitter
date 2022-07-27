import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(), //데이터 내용물
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]); // 이배열에서 첫번째 요소는 최근 document , 그뒤로는 이전 document
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      // 프로미스 반환
      nweet, // 필드
      createdAt: Date.now(), // 필드
    });
    setNweet("");
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
          placeholder="what's on your mind"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((el, index) => (
          <div key={el.id}>
            <h4>{el.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
