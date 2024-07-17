import styles from "./Subject.module.css";
import UnivInput from "./components/UnivInput";

export default function Subject() {
  return (
    <div className={styles.subject}>
      <UnivInput />
    </div>
  );
}
