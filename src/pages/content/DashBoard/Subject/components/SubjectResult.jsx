import { useContext, useEffect, useState } from "react";
import {
  checkUserSubjectOfMajor,
  needToStudySubjectCountHandle,
} from "./SubjectInputList";
import styles from "./SubjectResult.module.css";
import useGetChildDocs from "../../../../../hooks/useGetChildDocs";
import UserContext from "../../../../../components/context/UserContext";
import SubjectListOfMajor from "./SubjectListOfMajor";

export default function SubjectResult({ currentUnivMajor }) {
  const userSubject = useContext(UserContext).userSubject;
  const { univ, major } = currentUnivMajor;
  const [subjectListOfMajor, setSubjectListOfMajor] = useState(null);
  const [resultUserDataOfMajor, setResultUserDataOfMajor] = useState(null);

  const getResultByUserData = async () => {
    const data = await useGetChildDocs("admin_subject", univ, major);
    const needToStudyCount = await needToStudySubjectCountHandle(univ, major);
    let [newSubjectListOfMajor, newResultUserDataOfMajor] =
      await checkUserSubjectOfMajor(data, needToStudyCount, userSubject);

    setSubjectListOfMajor(newSubjectListOfMajor);
    setResultUserDataOfMajor(newResultUserDataOfMajor);
  };

  useEffect(() => {
    getResultByUserData();
  }, []);

  return (
    <ul className={styles["subject-result"]}>
      {subjectListOfMajor !== null &&
        subjectListOfMajor
          .slice(0, 4)
          .map((value, index) => (
            <SubjectListOfMajor value={value} key={index} index={index} />
          ))}
      {resultUserDataOfMajor !== null && (
        <div className={styles.result}>
          <p>
            학과에 반영되는 과목 수 :{" "}
            {resultUserDataOfMajor.majorSubject.length}
          </p>
          <p>
            학과에 반영되는 과목 :{" "}
            {resultUserDataOfMajor.majorSubject.map((subject, index) => (
              <span key={index}>{subject.name} </span>
            ))}
          </p>
          <p>
            필수로 들어야 하는 과목 추천 :{" "}
            {resultUserDataOfMajor.needToStudy ? (
              <>
                {resultUserDataOfMajor.needToStudySubject.map(
                  (subject, index) => (
                    <span key={index}>{subject.name} </span>
                  )
                )}
              </>
            ) : (
              "없음"
            )}
          </p>
        </div>
      )}
    </ul>
  );
}
