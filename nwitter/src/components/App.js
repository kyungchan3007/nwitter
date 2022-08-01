import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);

  // useEffect(() => {
  //   authService.onAuthStateChanged((user) => {
  //     user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  //     setInit(false);
  //   });
  // }, []);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 어플리케이션 초기화 될때 발생 , 로그인 로그아웃 시 실행
      if (user) setUserObject(user);
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObject)} userObject={userObject} />
      ) : (
        "Initializing..."
      )}
      {/* <AppRouter isLoggedIn={isLoggedIn} userObject={userObject} /> */}

      <footer>&copy; Nwitter {new Date().getUTCFullYear()}</footer>
    </>
  );
}
export default App;
