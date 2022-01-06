/*
/ Rick Fox
/ 01-06-22
/ Main app entry point
*/
import React, { useEffect, useState } from "react";

import auth from "./services/auth";
import "./app.css";


// TODO: TMP Remove
// import api from "./services/api";

// Create a context to hold the authed user
const AuthContext = React.createContext(false);

function App() {
  // Holds inital loading state
  const [initalized, setInitalized] = useState(0);
  // holds the active logged in User
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // initalize the auth check sequece
    const authCbId = auth.init(() => {
      // set the loggedIn user to the auth service authedUser
      setLoggedIn(auth.authedUser ? { ...auth.authedUser } : false);
      // the app has been initalized
      setInitalized(1);
      // api.getPostByIdComments(2)
      // .then((posts)=>{
      //   console.log('main app posts', posts)
      // })
    });
    return () => {
      // remove the auth service cb
      auth.destroy(authCbId);
    };
  }, []);

  return (
    <AuthContext.Provider value={loggedIn}>
      <div className="app">
        {initalized ? null : "Loading"}
        <br />
        {loggedIn ? "authed" : "not-authed"}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
