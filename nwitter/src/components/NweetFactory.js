import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";
const NweetFactory = (userObject) => {
  const [nweet, setNweet] = useState("");
  const [isfile, setIsFile] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (imageUrl === "") {
      const fileRef = storageService
        .ref()
        .child(`${userObject.uid}/${uuidv4()}`);
      const response = await fileRef.putString(isfile, "data_url");
      imageUrl = await response.ref.getDownloadURL();
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      id: userObject.uid,
      imageUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setIsFile("");
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
      const {
        currentTarget: { result },
      } = finishedEvent;
      setIsFile(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearPhotClick = () => setIsFile(null);

  return (
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
  );
};
export default NweetFactory;
