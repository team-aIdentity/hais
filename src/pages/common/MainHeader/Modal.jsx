import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

export default function Modal({ category, description, info, onClick }) {
  const modalElement = document.getElementById("modal");
  console.log(category, description, info, onClick);

  return (
    <>
      {createPortal(
        <div className={styles.modal}>
          <div className={styles.backdrop} onClick={onClick}></div>
          <div className={styles.card}>
            <div className={styles.title}>
              <p>{category}</p>
              <button onClick={onClick}>&gt;</button>
            </div>
            <div className={styles.description}>
              <p>{info}</p>
              <p>{description}</p>
            </div>
          </div>
        </div>,
        modalElement
      )}
    </>
  );
}
