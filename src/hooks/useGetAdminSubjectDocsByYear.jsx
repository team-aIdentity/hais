import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

export default async function useGetAdminSubjectDocsByYear(
  selectedYear,
  univ,
  major
) {
  try {
    let data = [];

    let childRef = `admin_subject/${selectedYear}/${univ}/${major}`;

    let newIndexData = [];
    const yogangDataQuery = await getDocs(collection(db, childRef + "/yogang"));
    yogangDataQuery.docs.forEach((doc) => newIndexData.push(doc.data().id));

    for (let i = 0; i < newIndexData.length; i++) {
      let newData = [];
      let newDataRef = collection(
        db,
        childRef + `/yogang/${newIndexData[i]}/subject`
      );
      let dataQuery = await getDocs(newDataRef);
      dataQuery.docs.forEach((doc) => newData.push(doc.data()));

      data.push(newData);
    }

    return data;
  } catch (e) {
    console.log("GetChildDoc >>>>> " + e);
  }
}
