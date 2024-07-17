import styles from "./Admin.module.css";
import AdminSubjectInput from "./components/AdminSubjectInput";

export default function Admin() {
  return (
    <div className={styles.admin}>
      <AdminSubjectInput />
    </div>
  );
}
