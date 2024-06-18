import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const FirebaseContext = React.createContext({
  createUserAccountHandle: () => {},
  getDocHandle: () => {},
  getDocsHandle: () => {},
  setDocHandle: () => {},
  addDocHandle: () => {},
  updateDocHandle: () => {},
});

export const FirebaseContextProvider = (props) => {
  const createUserAccountHandle = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("email", email);
      return user;
    } catch (e) {
      console.log("createAccount >>>>> " + e);
    }
  };

  const getDocHandle = async (collectionName, docId) => {
    const dataRef = doc(db, collectionName, docId);
    const dataQuery = await getDoc(dataRef);
    return dataQuery.data();
  };

  const getDocsHandle = async (collectionName) => {
    let data = [];
    const dataRef = collection(db, collectionName);
    const dataQuery = await getDocs(dataRef);
    dataQuery.docs.forEach((doc) => data.push(doc.data()));
    return data;
  };

  const setDocHandle = async (collectionName, docId, data) => {
    const dataRef = doc(db, collectionName, docId);
    await setDoc(dataRef, data);
  };

  const addDocHandle = async (collectionName, data) => {
    const dataRef = collection(db, collectionName);
    const dataQuery = await addDoc(dataRef, data);
    return dataQuery.id;
  };

  const updateDocHandle = async (collectionName, docId, data) => {
    const dataRef = doc(db, collectionName, docId);
    await updateDoc(dataRef, data);
  };

  return (
    <FirebaseContext.Provider
      value={{
        createUserAccountHandle: createUserAccountHandle,
        getDocHandle: getDocHandle,
        getDocsHandle: getDocsHandle,
        setDocHandle: setDocHandle,
        addDocHandle: addDocHandle,
        updateDocHandle: updateDocHandle,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
