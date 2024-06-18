import { useContext } from "react";
import UserContext from "../../../../../components/context/UserContext";
import styles from "./SubjectResult.module.css";

const bgColorList = ["blue", "green", "orange", "purple"];

export default function SubjectResult() {
  const userData = useContext(UserContext).userData;
  const userSubject = userData.subject;

  const subjectPassGrade = [2, 3, 5, 1, 2, 3, 4, 5];

  return (
    <ul className={styles["subject-result"]}>
      {userSubject.map((value, index) => (
        <li key={index}>
          <div className={styles["title-container"]}>
            <p
              className={styles["title"]}
              style={{
                color: `${
                  value.grade - subjectPassGrade[value.subject] > 0
                    ? "red"
                    : "black"
                }`,
              }}
            >
              {value.title}
            </p>
          </div>
          <div className={styles["value-container"]}>
            <div className={styles["slidebar"]}>
              <p className={styles["grade-title"]}>{value.grade}</p>
              <div
                className={styles["avg-divider"]}
                style={{
                  width: `calc(${
                    ((10 - subjectPassGrade[3]) / 9) * 100
                  }% - 20px)`,
                }}
              >
                <p>합격</p>
              </div>
              <div
                className={styles["value-level-slidebar"]}
                style={{
                  width: `${((10 - value.grade) / 9) * 100}%`,
                  backgroundColor: `${bgColorList[index]}`,
                }}
              />
            </div>
            <div className={styles["grade-level-container"]}>
              <p>9등급</p>
              <p>1등급</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
