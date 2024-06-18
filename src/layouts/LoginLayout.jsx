import { Outlet } from "react-router-dom";
import styles from "./LoginLayout.module.css";

export default function LoginLayout() {
  return (
    <div className={styles.main}>
      <Outlet />
    </div>
  );
}
