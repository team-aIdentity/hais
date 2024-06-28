import { useState } from "react";
import styles from "./Subject.module.css";
import SubjectResult from "./components/SubjectResult";
import UnivInput from "./components/UnivInput";

export default function Subject() {
  const [currentUnivMajor, setCurrentUnivMajor] = useState();

  return (
    <div className={styles.subject}>
      <UnivInput setCurrentUnivMajor={setCurrentUnivMajor} />
      {currentUnivMajor != undefined && (
        <SubjectResult currentUnivMajor={currentUnivMajor} />
      )}
    </div>
  );
}
