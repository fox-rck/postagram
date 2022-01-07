/*
/ Rick Fox
/ 01-06-22
/ Main app entry point
*/
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";

import auth from "./services/auth";
import "./app.css";

import AuthContext from "./services/auth-context";

// Components
import Header from "./components/header";

//Views
import Feed from "./views/feed";
// import SigninPage from "./views/signin";
// import NotFoundPage from "./views/not-found";
// import RegisterPage from './views/register'
const SigninPage = lazy(() => import("./views/signin"));
const RegisterPage = lazy(() => import("./views/register"));
const NotFoundPage = lazy(() => import("./views/not-found"));
const PostPage = lazy(() => import("./views/post"));

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
      <div className="app bg-gray-100">
        <Header />
        <Feed />
        <Suspense fallback={<div>{"Loading..."}</div>}>
          <Routes>
            <Route path='/' element={<div /> } exact />
            <Route path='/signin' element={<SigninPage /> } />
            <Route path='/register' element={<RegisterPage /> } />
            <Route path='/post/:id' element={<PostPage /> } />
            <Route path="*" element={<NotFoundPage /> } />
          </Routes>
        </Suspense>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
