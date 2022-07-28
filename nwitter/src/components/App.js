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
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObject={userObject} />
      ) : (
        "Initializing..."
      )}

      <footer>&copy; Nwitter {new Date().getUTCFullYear()}</footer>
    </>
  );
}
export default App;
