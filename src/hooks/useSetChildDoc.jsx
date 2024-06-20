import { setDoc, doc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function useSetChildDoc(
  collectionName,
  docId,
  childCollectionName,
  childDocId,
  data
) {
  const dataRef = doc(
    db,
    collectionName,
    `${docId}`,
    childCollectionName,
    childDocId
  );
  await setDoc(dataRef, data);
}
