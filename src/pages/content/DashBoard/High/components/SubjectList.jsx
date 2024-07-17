import styles from "./SubjectList.module.css";

export default function SubjectList({ subjectList, deleteSubjectHandle }) {
  return (
    <>
      {subjectList.length !== 0 && (
        <div className={styles.list}>
          <div>
            {[...subjectList].reverse().map((value, index) => (
              <li
                key={index}
                onClick={() =>
                  deleteSubjectHandle(subjectList.length - index - 1)
                }
              >
                <p className={styles.title}>{value.name}</p>
                <p className={styles.grade}>{value.subjectGrade} 등급</p>
                <p className={styles.credit}>{value.subjectCredit} 학점</p>
              </li>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
