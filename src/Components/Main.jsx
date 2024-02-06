import React, { useState } from "react";
import Home from "./Main-components/Home";
import Users from "./Main-components/Users";

const Main = ({ auth, setAuth }) => {
  const [home, setHome] = useState(true);

  return (
    <div>
      {home ? (
        <Home home={home} setHome={setHome} auth={auth} setAuth={setAuth} />
      ) : (
        <Users home={home} setHome={setHome} auth={auth} setAuth={setAuth} />
      )}
    </div>
  );
};

export default Main;
