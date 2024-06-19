import { useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import useGetDoc from "../../hooks/useGetDoc";

export const UserContextProvider = (props) => {
  const [userData, setUserData] = useState({
    phone: "",
    name: "",
    email: "",
    accessToken: "",
    id: "",
  });

  console.log(userData);

  const setUpUserData = async () => {
    const loginedId = localStorage.getItem("id");
    if (loginedId == null) return;
    const preUserData = await useGetDoc("users", loginedId);

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
