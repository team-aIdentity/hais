import { useContext } from "react";
import styles from "./SubjectList.module.css";
import UserContext from "../../../../../components/context/UserContext";

export default function SubjectList() {
  const subjectList = useContext(UserContext).userSubject;
  return (
    <div className={styles.list}>
      <div>
        {subjectList != undefined &&
          subjectList.map((value, index) => (
            <li key={index}>
              <p className={styles.title}>{value.subjectType}</p>
              <p className={styles.grade}>{value.subjectGrade} 등급</p>
            </li>
          ))}
      </div>
    </div>
  );
}
