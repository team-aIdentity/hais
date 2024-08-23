import { useContext, useEffect, useState } from "react";
import {
  checkUserSubjectOfMajor,
  needToStudySubjectCountHandle,
} from "./SubjectInputList";
import styles from "./SubjectResult.module.css";
import useGetChildDocs from "../../../../../hooks/useGetChildDocs";
import UserContext from "../../../../../components/context/UserContext";
import SubjectListOfMajor from "./SubjectListOfMajor";
import useGetAdminSubjectDocsByYear from "../../../../../hooks/useGetAdminSubjectDocsByYear";
import Modal from "../../../../common/MainHeader/Modal";

export default function SubjectResult({ currentUnivMajor }) {
  const userSubject = useContext(UserContext).userSubject;
  const { univ, major, yogang, selectedYear } = currentUnivMajor;

  const [subjectListOfMajor, setSubjectListOfMajor] = useState(null);
  const [resultUserDataOfMajor, setResultUserDataOfMajor] = useState(null);
  const [needToStudyCount, setNeedToStudyCount] = useState(null);
  const [isModal, setIsModal] = useState(null);

  const getResultByUserData = async () => {
    const data = (
      await useGetAdminSubjectDocsByYear(selectedYear, univ, major)
    )[yogang];

    const needToStudyCount = Number(
      (await needToStudySubjectCountHandle(univ, major, selectedYear, yogang))
        .needToStudy
    );

    setNeedToStudyCount(needToStudyCount);

    let [newSubjectListOfMajor, newResultUserDataOfMajor] =
      await checkUserSubjectOfMajor(data, needToStudyCount, userSubject);

    setSubjectListOfMajor(newSubjectListOfMajor);
    setResultUserDataOfMajor(newResultUserDataOfMajor);
  };

  useEffect(() => {
    getResultByUserData();
  }, [userSubject, currentUnivMajor]);

  return (
    <ul className={styles["subject-result"]}>
      {isModal && (
        <Modal
          description={isModal.description}
          info={isModal["etc_info"]}
          category={isModal.category}
          onClick={() => setIsModal(null)}
        />
      )}
      {subjectListOfMajor !== null &&
        subjectListOfMajor
          .slice(0, 4)
          .map((value, index) => (
            <SubjectListOfMajor value={value} key={index} index={index} />
          ))}
      {resultUserDataOfMajor !== null && (
        <div className={styles.result}>
          <p>
            수강하고 있는 과목 :{" "}
            {userSubject.length !== 0 ? (
              <>
                {userSubject.map((subject, index) => (
                  <span
                    key={index}
                    className={styles["need-to-study"]}
                    onClick={() => setIsModal(subject)}
                  >
                    {subject.name}
                  </span>
                ))}
              </>
            ) : (
              "없음"
            )}
          </p>
          <p>
            필수로 들어야 하는 과목 추천 :{" "}
            {resultUserDataOfMajor.needToStudy ? (
              <>
                {resultUserDataOfMajor.needToStudySubject.map(
                  (subject, index) => (
                    <span
                      key={index}
                      className={styles["need-to-study"]}
                      onClick={() => setIsModal(subject)}
                    >
                      {subject.name}
                    </span>
                  )
                )}
              </>
            ) : (
              "없음"
            )}
          </p>
          <p>무조건 들어야 하는 과목 수 : {needToStudyCount}</p>
          <p>
            수강한 과목의 전체 학점 :{" "}
            {resultUserDataOfMajor.sumSubjectCredit.length !== 0
              ? `${resultUserDataOfMajor.sumSubjectCredit}`
              : "없음"}
          </p>
          <p>
            학과에 반영되는 과목 수 :{" "}
            {resultUserDataOfMajor.majorSubject.length}
          </p>
          <p>
            학과에 반영되는 과목 :{" "}
            {resultUserDataOfMajor.majorSubject.map((subject, index) => (
              <span
                key={index}
                className={styles["need-to-study"]}
                onClick={() => setIsModal(subject)}
              >
                {subject.name}
              </span>
            ))}
          </p>
        </div>
      )}
    </ul>
  );
}
