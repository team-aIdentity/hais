import SchoolInput from "./SchoolInput";
import SubjectInput from "./SubjectInput";
import styles from "./UserHighInput.module.css";

export default function UserHighInput() {
  // const [userInputData]

  return (
    <div className={styles.body}>
      <SchoolInput />
      <SubjectInput />
    </div>
  );
}
