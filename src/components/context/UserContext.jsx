import React from "react";

const UserContext = React.createContext({
  userData: {},
  userSubject: [],
  setUserData: () => {},
  setUpUserData: () => {},
  getUserSubject: () => {},
});

export default UserContext;
