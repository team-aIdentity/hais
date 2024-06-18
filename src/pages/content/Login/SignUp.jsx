import styles from "./SignUp.module.css";
import bgImg from "../../../assets/Hais_Home_background.png";
import logoImg from "../../../assets/android-chrome-512x512.png";
import { useContext, useRef, useState } from "react";
import UserContext from "../../../components/context/UserContext";
import FirebaseContext from "../../../components/context/FirebaseContext";
import { useNavigate } from "react-router-dom";

const createUserAccount = async (inputs, nav, fbCtx) => {
  const user = await fbCtx.createUserAccountHandle(
    inputs.email,
    inputs.password
  );
  const userData = {
    email: inputs.email,
    accessToken: user.accessToken,
    uid: user.uid,
    school: {
      schoolName: "",
      schoolType: "",
      schoolArea: "",
    },
    subject: [],
  };
  fbCtx.setDocHandle("users", inputs.email, userData);
  nav("/");
};

export default function SignUp() {
  const inputRef = useRef([]);

  const fbCtx = useContext(FirebaseContext);
  const userCtx = useContext(UserContext);
  const nav = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const regexp = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/;
  const vaildEmail = email.match(regexp);
  const vaildPassword = password.length >= 8 && password.length <= 20;

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const signUpHandler = (e) => {
    e.preventDefault();
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
      userCtx.setUserData({
        ...userCtx.userData,
        email: inputs.email,
      });
      createUserAccount(inputs, nav, fbCtx);
    }
  };

  return (
    <>
      <div className={styles.signup}>
        <div className={styles["information-container"]}>
          <img src={logoImg} alt="logo" />
          <p className={styles.title}>Sign Up</p>
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
              placeholder="8글자 이상 20글자 이하"
              value={password}
              onChange={handleChange}
              ref={(el) => (inputRef.current[1] = el)}
            />
          </div>
          <div className={styles["submit-container"]}>
            <button type="submit">Sign Up</button>
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
