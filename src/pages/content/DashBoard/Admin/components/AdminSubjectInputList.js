import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../components/firebase/firebase";

export const subjectGrade = [
  { name: "1 등급", value: 1 },
  { name: "2 등급", value: 2 },
  { name: "3 등급", value: 3 },
  { name: "4 등급", value: 4 },
  { name: "5 등급", value: 5 },
  { name: "6 등급", value: 6 },
  { name: "7 등급", value: 7 },
  { name: "8 등급", value: 7 },
  { name: "9 등급", value: 7 },
];

export const subjectYear = ["2022년", "2023년", "2024년"];

export const majorOfUnivHandle = async (value) => {
  const majorList = [];
  const currentUniv = value;
  const majorQuery = query(
    collection(db, "majors"),
    where("univ", "==", `${currentUniv.name}`)
  );
  const majorSnapShot = await getDocs(majorQuery);
  majorSnapShot.docs.forEach((doc) => majorList.push(doc.data()));

  return majorList;
};

export const needToStudySubjectCountHandle = async (
  univ,
  major,
  selectedYear,
  index
) => {
  let data = [];
  const yogangDataQuery = await getDocs(
    collection(db, `admin_subject/${selectedYear}/${univ}/${major}/yogang`)
  );
  yogangDataQuery.docs.forEach((doc) => data.push(doc.data()));

  return data;
};

export const needToStudyCountList = [
  { name: "1 과목", value: 1 },
  { name: "2 과목", value: 2 },
  { name: "3 과목", value: 3 },
  { name: "4 과목", value: 4 },
  { name: "5 과목", value: 5 },
  { name: "6 과목", value: 6 },
  { name: "7 과목", value: 7 },
];
