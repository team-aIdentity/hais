import { useContext } from "react";
import styles from "./SubjectList.module.css";
import UserContext from "../../../../../components/context/UserContext";

export default function SubjectList() {
  const ctx = useContext(UserContext);
  return (
    <div className={styles.list}>
      <div>
        {ctx.userSubject != undefined &&
          ctx.userSubject.map((value, index) => (
            <li key={index}>
              <p className={styles.title}>{value.subjectType}</p>
              <p className={styles.grade}>{value.subjectGrade} 등급</p>
            </li>
          ))}
      </div>
    </div>
  );
}
