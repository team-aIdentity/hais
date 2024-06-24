import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function useGetChildDoc(
  collectionName,
  docId,
  childCollectionName,
  childDocId
) {
  try {
    const dataRef = doc(
      db,
      collectionName,
      `${docId}`,
      childCollectionName,
      childDocId
    );
    const dataQuery = await getDoc(dataRef);
    return dataQuery.data();
  } catch (e) {
    console.log("GetChildDoc >>>>> " + e);
  }
}
