import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function useGetSubjectDocsByYear(id, selectedYear) {
  try {
    let data = [];
    const dataRef = collection(
      db,
      `users/${id}/subject/${selectedYear}/subject`
    );
    const dataQuery = await getDocs(dataRef);
    dataQuery.docs.forEach((doc) => data.push(doc.data()));

    return data;
  } catch (e) {
    console.log("GetChildDoc >>>>> " + e);
  }
}
