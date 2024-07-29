import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import MainHeader from "../pages/common/MainHeader/MainHeader";
import { auth } from "../components/firebase/firebase";
import { useEffect } from "react";

export default function MainLayout() {
  useEffect(async () => {
    await auth.currentUser.reload();
    console.log(auth.currentUser);
  }, []);

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
