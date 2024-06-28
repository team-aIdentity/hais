import styles from "./SubjectListOfMajor.module.css";

export default function SubjectListOfMajor({ value, index }) {
  const bgColorList = ["blue", "green", "orange", "purple"];

  return (
    <li className={styles.list}>
      <div className={styles["title-container"]}>
        <p
          className={styles["title"]}
          style={{
            color: `${value.isPass ? "black" : "red"}`,
          }}
        >
          {value.subjectType}
        </p>
      </div>
      <div className={styles["value-container"]}>
        <div className={styles["slidebar"]}>
          <p className={styles["grade-title"]}>{value.userSubjectGrade}</p>
          <div
            className={styles["avg-divider"]}
            style={{
              width: `calc(${
                ((10 - value.passSubjectGrade) / 9) * 100
              }% - 20px)`,
            }}
          >
            <p>합격</p>
          </div>
          <div
            className={styles["value-level-slidebar"]}
            style={{
              width: `${((10 - value.userSubjectGrade) / 9) * 100}%`,
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
  );
}
