import { useEffect, useState } from "react";
import AdminContext from "../context/AdminContext";

const UnivURL =
  "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/univ.json?alt=media&token=216969cb-0f37-4dec-b722-a473221cc5b1";

export const AdminContextProvider = (props) => {
  const [univ, setUniv] = useState([]);
  const getUnivList = async () => {
    try {
      setUniv(await (await fetch(UnivURL)).json());
    } catch (e) {
      console.log("Univ Data Fetch >>>>> " + e);
    }
  };

  useEffect(() => {
    getUnivList();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        univ: univ,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
