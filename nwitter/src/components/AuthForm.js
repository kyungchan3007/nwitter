import React from "react";

const AuthForm = (
  { toggleAccount },
  { onSubmit },
  LoginOnChange,
  email,
  error,
  password,
  newAccount
) => {
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
    </div>
  );
};

export default AuthForm;
