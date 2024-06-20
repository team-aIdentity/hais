import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function useGetDocs(collectionName) {
  let data = [];
  const dataRef = collection(db, collectionName);
  const dataQuery = await getDocs(dataRef);
  dataQuery.docs.forEach((doc) => data.push(doc.data()));
  return data;
}
