import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "./FirebaseContext";

const UserContext = React.createContext({
  userData: {},
  setUserData: () => {},
  setUpUserData: () => {},
});

export const UserContextProvider = (props) => {
  const getDocHandle = useContext(FirebaseContext).getDocHandle;
  const [userData, setUserData] = useState({
    email: "",
    accessToken: "",
    uid: "",
    school: {
      schoolName: "",
      schoolType: "",
      schoolArea: "",
    },
    subject: [],
  });

  const setUpUserData = async () => {
    const loginEmail = localStorage.getItem("email");
    const preUserData = await getDocHandle("users", loginEmail);

    setUserData(preUserData);
  };

  useEffect(() => {
    setUpUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        setUserData: setUserData,
        setUpUserData: setUpUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
