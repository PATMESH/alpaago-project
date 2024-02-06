import React from "react";
import Main from "./Components/Main";
import Authentication from "./Components/Authentication";
import { useState } from "react";

function App() {
  const name = localStorage.getItem("user-name");
  const isAuthenticated = !!name;

  const [auth, setAuth] = useState({
    userName: name,
    authenticated: isAuthenticated,
  });

  return auth.authenticated ? (
    <Main auth={auth} setAuth={setAuth} />
  ) : (
    <Authentication setAuth={setAuth} />
  );
}

export default App;
