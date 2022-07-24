import React, { useState } from "react";
import { authService } from "../firebase";
import { firebaseInstance } from "../firebase";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const LoginOnChange = (e) => {
    const {
      target: { name, value },
    } = e;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    name === "google"
      ? (provider = new firebaseInstance.auth.GoogleAuthProvider())
      : (provider = new firebaseInstance.auth.GithubAuthProvider());

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          required
          onChange={LoginOnChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={password}
          onChange={LoginOnChange}
        />
        {error}
        <span onClick={toggleAccount}>
          {newAccount ? "login" : "CreateAccount"}
        </span>
        <input type="submit" value={newAccount ? "CreateAccount" : "Log in"} />
      </form>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};
export default Auth;

//   const loginEmail = (e) => {
//     setEmail(e.target.value);
//     if (e.target.value === "") {
//       alert("이메일을입력");
//     }
//     console.log(e.target.name);
//   };

//   const loginPassword = (e) => {
//     setPassword(e.target.value);
//     if (e.target.value === "") {
//       alert("비밀번호입력");
//     }
//     console.log(e.target.name);
//   };
