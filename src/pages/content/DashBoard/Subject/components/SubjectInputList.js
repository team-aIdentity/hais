import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../components/firebase/firebase";
import useGetDoc from "../../../../../hooks/useGetDoc";

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

export const needToStudySubjectCountHandle = async (
  univ,
  major,
  selectedYear,
  yogang
) => {
  let data = [];
  const yogangDataQuery = await getDocs(
    collection(db, `admin_subject/${selectedYear}/${univ}/${major}/yogang`)
  );
  yogangDataQuery.docs.forEach((doc) => data.push(doc.data()));

  return data[yogang];
};

export const checkUserSubjectOfMajor = (
  data,
  needToStudyCount,
  userSubject
) => {
  let newSubjectListOfMajor = [];
  let userSubjectInData = 0;

  //check subjectListOfMajor

  for (let index = 0; index < userSubject.length; index++) {
    for (let jndex = 0; jndex < data.length; jndex++) {
      if (userSubject[index].code != data[jndex].code) continue;

      let userSubjectValue = userSubject[index];
      let adminSubjectValue = data[jndex];

      let newSubjectType = userSubjectValue.name;
      let newSubjectCode = userSubjectValue.code;
      let newUserSubjectGrade = Number(userSubjectValue.subjectGrade);
      let newPassSubjectGrade = Number(adminSubjectValue.subjectGrade);
      let newIsSubjectPass = newUserSubjectGrade <= newPassSubjectGrade;

      let newSubject = {
        subjectType: newSubjectType,
        code: newSubjectCode,
        userSubjectGrade: newUserSubjectGrade,
        passSubjectGrade: newPassSubjectGrade,
        isPass: newIsSubjectPass,
      };

      newSubjectListOfMajor.push(newSubject);
      userSubjectInData += 1;
    }
  }

  let needToStudy = userSubjectInData < needToStudyCount;
  let needToStudySubjectCount = needToStudyCount - userSubjectInData;
  let needToStudySubject = [];
  let sumSubjectCredit = [];

  //check needToStudySubject

  for (let index = 0; index < data.length; index++) {
    if (needToStudySubjectCount <= 0) continue;

    let check = false;

    for (let jndex = 0; jndex < newSubjectListOfMajor.length; jndex++) {
      if (data[index].code == newSubjectListOfMajor[jndex].code) {
        check = true;
        continue;
      }
    }

    if (!check) {
      needToStudySubject = [...needToStudySubject, data[index]];

      needToStudySubjectCount -= 1;
    }
  }

  for (let i = 0; i < userSubject.length; i++) {
    sumSubjectCredit = Number(sumSubjectCredit) + userSubject[i].subjectCredit;
  }

  let newResultUserDataOfMajor = {
    majorSubject: data,
    needToStudy: needToStudy,
    sumSubjectCredit: sumSubjectCredit,
    needToStudySubject: needToStudy ? needToStudySubject : [],
  };

  return [newSubjectListOfMajor, newResultUserDataOfMajor];
};

export const subjectYear = ["2022년", "2023년", "2024년"];
