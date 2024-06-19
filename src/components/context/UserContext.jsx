import React from "react";

const UserContext = React.createContext({
  userData: {},
  setUserData: () => {},
  setUpUserData: () => {},
});

export default UserContext;
