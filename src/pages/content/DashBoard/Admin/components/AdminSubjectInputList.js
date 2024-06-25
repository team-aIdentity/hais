import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../components/firebase/firebase";

export const subjectGrade = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const subjectYear = [
  "1학년 1학기",
  "1학년 2학기",
  "2학년 1학기",
  "2학년 2학기",
  "3학년 1학기",
  "3학년 2학기",
];

export const majorOfUnivHandle = async (e) => {
  const majorList = [];
  const currentUniv = e.target.value;
  const majorQuery = query(
    collection(db, "majors"),
    where("univ", "==", `${currentUniv}`)
  );
  const majorSnapShot = await getDocs(majorQuery);
  majorSnapShot.docs.forEach((doc) => majorList.push(doc.data()));

  return majorList;
};
