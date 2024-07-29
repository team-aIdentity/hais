import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Verify.module.css";
import { auth } from "../../../components/firebase/firebase";
import { sendEmailVerification } from "firebase/auth";
import useUpdateDoc from "../../../hooks/useUpdateDoc";

export default function Verify() {
  const nav = useNavigate();
  const user = auth.currentUser;

  const checkSignUpHandle = async () => {
    if (!user) {
      alert("잘못된 접근입니다.");
      return nav("/login");
    } else if (user.emailVerified) {
      alert("이미 인증을 완료했습니다.");
      return nav("/login");
    }

    await sendEmailVerification(user);
  };

  const verifyCompleteHandle = async () => {
    await auth.currentUser.reload();
    console.log(user);
    if (!user.emailVerified) {
      alert("인증을 완료해주세요");
    } else {
      alert("인증이 완료되었습니다!");
      await useUpdateDoc("users", user.uid, { isVerified: true });

      console.log("Verify Complete");
      nav("/login");
    }
  };

  useEffect(() => {
    checkSignUpHandle();
  }, []);

  return (
    <>
      <div className={styles.verify}>
        <div className={styles["verify-container"]}>
          <div>
            <p className={styles.title}>인증하기</p>
            <p className={styles["sub-title"]}>
              입력한 이메일에서 인증링크를 클릭해주세요
            </p>
          </div>
          <button onClick={() => verifyCompleteHandle()}>인증완료</button>
        </div>
      </div>
    </>
  );
}
