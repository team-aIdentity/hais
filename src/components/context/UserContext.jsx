import React, { useState } from "react";

const UserContext = React.createContext({
  userData: {},
  setUserData: () => {},
});

export const UserContextProvider = (props) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  return (
    <UserContext.Provider
      value={{
        userData: userData,
        setUserData: setUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
