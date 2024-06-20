import { doc, setDoc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function useSetDoc(collectionName, docId, data) {
  const dataRef = doc(db, collectionName, docId);
  await setDoc(dataRef, data);
}
