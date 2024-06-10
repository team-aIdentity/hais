import { Outlet } from "react-router-dom";
import styles from "./UserLayout.module.css";
import UserHeader from "../pages/common/UserHeader/UserHeader";

export default function UserLayout() {
  return (
    <div className={styles["user-container"]}>
      <div className={styles.header}>
        <UserHeader />
      </div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}
