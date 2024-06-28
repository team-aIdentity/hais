import { collection, getDocs, query, where } from "firebase/firestore";
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

export const needToStudySubjectCountHandle = async (univ, major) => {
  const data = await useGetDoc("admin_subject", univ);
  return Number(data[major]);
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

  let newResultUserDataOfMajor = {
    majorSubject: data,
    needToStudy: needToStudy,
    needToStudySubject: needToStudy ? needToStudySubject : null,
  };

  return [newSubjectListOfMajor, newResultUserDataOfMajor];
};
