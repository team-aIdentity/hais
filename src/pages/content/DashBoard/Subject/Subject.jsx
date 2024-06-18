import styles from "./Subject.module.css";
import SubjectResult from "./components/SubjectResult";
import UnivInput from "./components/UnivInput";

export default function Subject() {
  return (
    <div className={styles.subject}>
      <UnivInput />
      <SubjectResult />
    </div>
  );
}
