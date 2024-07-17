import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import MainHeader from "../pages/common/MainHeader/MainHeader";

export default function MainLayout() {
  return (
    <div className={styles["main-container"]}>
      <div className={styles.header}>
        <MainHeader />
      </div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}
