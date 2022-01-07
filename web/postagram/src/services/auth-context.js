/*
/ Rick Fox
/ 01-06-22
/ Auth Context for holding the logged in user
*/

import React from "react";
// Create a context to hold the authed user
const AuthContext = React.createContext(false);

export default AuthContext;
