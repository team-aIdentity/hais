import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function useGetChildDocs(
  collectionName,
  docId,
  childCollectionName
) {
  try {
    let data = [];
    const dataRef = collection(
      db,
      `${collectionName}/${docId}/${childCollectionName}`
    );
    const dataQuery = await getDocs(dataRef);
    dataQuery.docs.forEach((doc) => data.push(doc.data()));

    return data;
  } catch (e) {
    {
      e.code != "invalid-argument" && console.log("GetChildDocs >>>>> " + e);
    }
  }
}
