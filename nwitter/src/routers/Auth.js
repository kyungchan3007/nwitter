import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const LoginOnChange = (e) => {
    const {
      target: { name, value },
    } = e;
    const login = name === "email" ? setEmail(value) : setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
        <input type="submit" value="log in" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>
      </div>
    </div>
  );
};
export default Auth;
