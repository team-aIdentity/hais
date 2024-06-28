import styles from "./SubjectList.module.css";

export default function SubjectList({ subjectList }) {
  return (
    <>
      {subjectList.length !== 0 && (
        <div className={styles.list}>
          <div>
            {[...subjectList].reverse().map((value, index) => (
              <li key={index}>
                <p className={styles.title}>{value.name}</p>
                <p className={styles.grade}>{value.subjectGrade} 등급</p>
              </li>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
