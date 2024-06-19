import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function useGetDoc(collectionName, docId) {
  const dataRef = doc(db, collectionName, docId);
  const dataQuery = await getDoc(dataRef);
  return dataQuery.data();
}
