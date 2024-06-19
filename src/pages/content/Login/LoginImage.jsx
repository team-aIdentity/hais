import styles from "./LoginImage.module.css";
import bgImg from "../../../assets/Hais_Home_background.png";

export default function LoginImage() {
  return (
    <div className={styles.background}>
      <img src={bgImg} alt="backGround" />
      <div className={styles["title-container"]}>
        <p className={styles.title}>
          대학진학을 위한
          <br />
          선택교과를 탐색하세요
        </p>
        <p className={styles["sub-title"]}>
          HAIS에서 희망대학,희망학과를 입력하고
          <br />
          현재 나의 상태를 파악하여 수강할 과목을 결정하세요!
        </p>
      </div>
    </div>
  );
}
