import { Outlet, useNavigate } from "react-router-dom";
import styles from "./MainLayout.module.css";
import MainHeader from "../pages/common/MainHeader/MainHeader";
import { useEffect } from "react";

export default function MainLayout() {
  const nav = useNavigate();
  const userId = localStorage.getItem("loginedId");

  const checkIsLogin = async () => {
    if (userId == undefined) {
      alert("로그인을 먼저 진행해주세요");
      nav("/login");
    }
  };

  checkIsLogin();

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
