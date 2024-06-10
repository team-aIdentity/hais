import styles from "./Login.module.css";
import bgImg from "../../../assets/Hais_Home_background.png";
import logoImg from "../../../assets/android-chrome-512x512.png";
import { useContext, useRef, useState } from "react";
import UserContext from "../../../components/context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const inputRef = useRef([]);
  const userCtx = useContext(UserContext);
  const nav = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const regexp = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/;
  const vaildEmail = email.match(regexp);
  const vaildPassword = password.length >= 12 && password.length <= 20;

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const signUpHandler = (e) => {
    if (!vaildEmail) {
      alert("유효하지 않은 email 입니다.");
      inputRef.current[0].focus();
      setInputs({
        ...inputs,
        email: "",
      });
    } else if (!vaildPassword) {
      alert("유효하지 않은 password 입니다.");
      inputRef.current[1].focus();
      setInputs({
        ...inputs,
        password: "",
      });
    } else {
      userCtx.setUserData(inputs);
      nav("/");
    }
  };

  return (
    <>
      <div className={styles["input-container"]}>
        <div className={styles["information-container"]}>
          <img src={logoImg} alt="logo" />
          <p className={styles.title}>Sign in</p>
          <div className={styles["signup-container"]}>
            <p>Don't have an account?</p>
            <a href="">Sign Up</a>
          </div>
          <div className={styles["description-container"]}>
            <p className={styles.description}>
              You are browsing <span>Fuse React Demo</span>.
              <br />
              Click on the "Sign in" button to access
              <br />
              the Demo and Documentation.
            </p>
          </div>
        </div>
        <form
          className={styles["input-form-container"]}
          onSubmit={signUpHandler}
        >
          <div className={styles.input}>
            <label>Email*</label>
            <input
              type="text"
              name="email"
              placeholder="asd1234@gmail.com"
              value={email}
              onChange={handleChange}
              ref={(el) => (inputRef.current[0] = el)}
            />
          </div>
          <div className={styles.input}>
            <label>Password*</label>
            <input
              type="password"
              name="password"
              placeholder="12글자 이상 20글자 이하"
              value={password}
              onChange={handleChange}
              ref={(el) => (inputRef.current[1] = el)}
            />
          </div>
          <div className={styles["submit-container"]}>
            <div className={styles.checkbox}>
              <div>
                <input type="checkbox" />
                <p>Remember me</p>
              </div>
              <a href="">Forgot password?</a>
            </div>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
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
    </>
  );
}
