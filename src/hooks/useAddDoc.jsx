import { addDoc, collection } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function useAddDoc(collectionName, data) {
  const dataRef = collection(db, collectionName);
  const dataQuery = await addDoc(dataRef, data);
  return dataQuery.id;
}
