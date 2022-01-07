/*
/ Rick Fox
/ 01-06-22
/ Main app entry point
*/
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useRoutes, Routes, Route, Link } from "react-router-dom";

import auth from "./services/auth";
import "./app.css";

import AuthContext from "./services/auth-context";

// Components
import Header from "./components/header";

//Views
import Feed from "./views/feed";

const SigninPage = lazy(() => import("./views/signin"));
const RegisterPage = lazy(() => import("./views/register"));
const NotFoundPage = lazy(() => import("./views/not-found"));
const PostPage = lazy(() => import("./views/post"));
const NewPost = lazy(() => import("./views/new"));

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
        {loggedIn ? (
          <div className="max-w-screen-md mx-auto mt-3 p-2 px-4 w-full">
            <Link
              to={"/new"}
              className="block text-lg text-gray-500 p-2 w-full bg-white border border-blue-500 rounded-lg"
            >
              {"Write something..."}
            </Link>
          </div>
        ) : null}
        <Feed />
        <Suspense fallback={<div>{"Loading..."}</div>}>
          <Routes>
            <Route path="/" element={<div />} exact />
            <Route path="/signin" element={<SigninPage />} />
            {loggedIn ? <Route path="/new" element={<NewPost />} /> : null}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
