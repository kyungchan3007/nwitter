import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";
import { updateCurrentUser } from "firebase/auth";
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
    console.log("컴포넌트생김");
    return () => {
      authService.onAuthStateChanged((user) => {
        // 어플리케이션 초기화 될때 발생 , 로그인 로그아웃 시 실행
        if (user) setUserObject(user);
        setInit(true);
      });
      console.log("컴포넌트사라짐");
    };
  }, []);

  //
  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObject(authService.currentUser);

    //State가 유의미하게 변경되면 리렌더 된기 때문에 이방법으로도 사용가능하다
    // setInit(false);
    // setInit(true);
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObject)}
          userObject={userObject}
        />
      ) : (
        "Initializing..."
      )}
      {/* <AppRouter isLoggedIn={isLoggedIn} userObject={userObject} /> */}

      <footer>&copy; Nwitter {new Date().getUTCFullYear()}</footer>
    </>
  );
}
export default App;
