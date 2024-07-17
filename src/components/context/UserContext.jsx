import React from "react";

const UserContext = React.createContext({
  userData: {},
  userSubject: [],
  setUserData: () => {},
  setUpUserData: () => {},
  getUserSubject: () => {},
  setUserSubject: () => {},
});

export default UserContext;
