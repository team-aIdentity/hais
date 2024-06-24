import styles from "./Member.module.css";
import SchoolInput from "./components/SchoolInput";

export default function Member() {
  return (
    <div className={styles.member}>
      <SchoolInput />
    </div>
  );
}
