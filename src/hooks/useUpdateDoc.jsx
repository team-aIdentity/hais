import { doc, updateDoc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function updateDocHandle(collectionName, docId, data) {
  const dataRef = doc(db, collectionName, docId);
  await updateDoc(dataRef, data);
}
