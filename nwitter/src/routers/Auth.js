import React, { useState } from "react";
import { authService } from "../firebase";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
      alert(error);
    }
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
        <input type="submit" value={newAccount ? "CreateAccount" : "Log in"} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>
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
