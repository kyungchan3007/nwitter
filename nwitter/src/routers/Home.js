import React, { useState } from "react";
import { dbService } from "../firebase";

const Home = () => {
  const [nweet, setNweet] = useState("");

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
    </div>
  );
};
export default Home;
