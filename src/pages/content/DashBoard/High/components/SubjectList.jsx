import styles from "./SubjectList.module.css";
import deleteImg from "../../../../../assets/delete_button.png";
import { useState } from "react";
import Modal from "../../../../common/MainHeader/Modal";

export default function SubjectList({ subjectList, deleteSubjectHandle }) {
  const [isModal, setIsModal] = useState();
  return (
    <>
      {subjectList.length !== 0 && (
        <div className={styles.list}>
          {isModal && (
            <Modal
              description={isModal.description}
              info={isModal["etc_info"]}
              category={isModal.category}
              onClick={() => setIsModal(null)}
            />
          )}
          <div>
            {[...subjectList].reverse().map((value, index) => (
              <li key={index}>
                <div
                  className={styles.delete}
                  onClick={() =>
                    deleteSubjectHandle(subjectList.length - index - 1)
                  }
                >
                  <img src={deleteImg} alt="deleteImg" />
                </div>
                <div className={styles.value} onClick={() => setIsModal(value)}>
                  <p className={styles.title}>{value.name}</p>
                  <p className={styles.grade}>{value.subjectGrade} 등급</p>
                  <p className={styles.credit}>{value.subjectCredit} 학점</p>
                </div>
              </li>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
