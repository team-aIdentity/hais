import { useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import useGetDoc from "../../hooks/useGetDoc";
import useGetChildDocs from "../../hooks/useGetChildDocs";

export const UserContextProvider = (props) => {
  const [userSubject, setUserSubject] = useState([]);
  const [userData, setUserData] = useState({
    phone: "",
    name: "",
    email: "",
    accessToken: "",
    id: "",
  });

  const setUpUserData = async () => {
    const loginedId = localStorage.getItem("loginedId");

    if (loginedId == null) return;
    const preUserData = await useGetDoc("users", loginedId);

    setUserData(preUserData);
  };

  const getUserSubject = async () => {
    const loginedId = localStorage.getItem("loginedId");

    const preUserSubject = await useGetChildDocs("users", loginedId, "subject");

    setUserSubject(preUserSubject);
  };

  useEffect(() => {
    setUpUserData();
    getUserSubject();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        userSubject: userSubject,
        setUserData: setUserData,
        setUpUserData: setUpUserData,
        getUserSubject: getUserSubject,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
