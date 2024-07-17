import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function useDeleteDoc(collectionName) {
  try {
    const dataRef = doc(db, collectionName);
    await deleteDoc(dataRef);
  } catch (e) {
    console.log("usedelete >>>>> " + e);
  }
}
