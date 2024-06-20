import { doc, updateDoc } from "firebase/firestore";

export default async function updateDocHandle(collectionName, docId, data) {
  const dataRef = doc(db, collectionName, docId);
  await updateDoc(dataRef, data);
}
