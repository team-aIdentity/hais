import styles from "./Login.module.css";
import logoImg from "../../../assets/android-chrome-512x512.png";
import { useContext } from "react";
import UserContext from "../../../components/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "./LoginImage";
import { useForm } from "react-hook-form";
import useLoginAccount from "../../../hooks/useLoginAccount";

const signInList = [
  {
    label: "Email",
    name: "email",
    type: "text",
    placeholder: "abcd1234@gmail.com",
    require: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "8자리 이상, 20자리 이하",
    require: true,
  },
];

export default function Login() {
  const userCtx = useContext(UserContext);
  const nav = useNavigate();

  const { register, handleSubmit } = useForm();

  const signinUserAccount = async (email, password) => {
    const user = await useLoginAccount(email, password);
    localStorage.setItem("loginedId", user.uid);
    userCtx.setUpUserData();

    nav("/");
  };

  const signInHandler = (data) => {
    const { email, password } = data;

    const regEmail = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/;
    const vaildEmail = email.match(regEmail);
    const vaildPassword = password.length >= 8 && password.length <= 20;

    if (!vaildEmail) {
      alert("이메일을 다시 입력해주세요.");
    } else if (!vaildPassword) {
      alert("비밀번호를 다시 입력해주세요.");
    } else {
      console.log("User Login Input Complete");

      signinUserAccount(email, data);
    }
  };

  return (
    <>
      <div className={styles.login}>
        <div className={styles["information-container"]}>
          <img src={logoImg} alt="logo" />
          <p className={styles.title}>Sign in</p>
          <div className={styles["signup-container"]}>
            <p>Don't have an account?</p>
            <Link to="signup">Sign Up</Link>
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
          onSubmit={handleSubmit((data) => signInHandler(data))}
        >
          {signInList.map((value, index) => (
            <div className={styles.input} key={index}>
              <label>
                {value.label}
                {value.require && "*"}
              </label>
              <input
                type={value.type}
                name={value.name}
                placeholder={value.placeholder}
                {...register(value.name, { required: value.require })}
              />
            </div>
          ))}
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
      <LoginImage />
    </>
  );
}
