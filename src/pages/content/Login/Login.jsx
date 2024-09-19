import styles from "./Login.module.css";
import logoImg from "../../../assets/android-chrome-512x512.png";
import { useContext, useState } from "react";
import UserContext from "../../../components/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "./LoginImage";
import { useForm } from "react-hook-form";
import useLoginAccount from "../../../hooks/useLoginAccount";
import useGetDoc from "../../../hooks/useGetDoc";

const signInList = [
  {
    label: "이메일",
    name: "email",
    type: "text",
    placeholder: "abcd1234@gmail.com",
    require: true,
  },
  {
    label: "비밀번호",
    name: "password",
    type: "password",
    placeholder: "6자리 이상, 20자리 이하",
    require: true,
  },
];

export default function Login() {
  const userCtx = useContext(UserContext);
  const nav = useNavigate();

  const { register, handleSubmit } = useForm();
  const [isNotValid, setIsNotValid] = useState(["", "", "", "", ""]);

  const signinUserAccount = async (email, password) => {
    const uid = await useLoginAccount(email, password);
    const userData = await useGetDoc("users", uid);
    if (!userData.isVerified || userData.isVerified == undefined) {
      alert("이메일 인증을 먼저 완료해주세요");
      nav("/login/verify");
      return;
    }

    localStorage.setItem("loginedId", uid);
    userCtx.setUpUserData();

    nav("/");
  };

  const signInHandler = (data) => {
    let newIsNotValid = ["", ""];
    const { email, password } = data;

    const regEmail = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/;
    const vaildEmail = email.match(regEmail);
    const vaildPassword = password.length >= 6 && password.length <= 20;

    switch (true) {
      case !vaildEmail:
        newIsNotValid[0] = true;
        setIsNotValid(newIsNotValid);
        break;
      case !vaildPassword:
        newIsNotValid[1] = true;
        setIsNotValid(newIsNotValid);
        break;
      default:
        setIsNotValid(newIsNotValid);
        console.log("User Login Input Complete");
        signinUserAccount(email, password);
        break;
    }
  };

  return (
    <>
      <div className={styles.login}>
        <div className={styles["information-container"]}>
          <img src={logoImg} alt="logo" />
          <p className={styles.title}>로그인</p>
          <div className={styles["signup-container"]}>
            <p>계정이 없으신가요?</p>
            <Link to="signup">회원가입</Link>
          </div>
        </div>
        <form
          className={styles["input-form-container"]}
          onSubmit={handleSubmit((data) => signInHandler(data))}
        >
          {signInList.map((value, index) => (
            <div
              className={styles.input}
              key={index}
              active={`${isNotValid[index]}`}
            >
              <label>
                {isNotValid[index] === true
                  ? "다시 입력해주세요."
                  : value.label}
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
              <a href="">비밀번호를 잃어버렸나요?</a>
            </div>
            <button type="submit">로그인</button>
          </div>
        </form>
      </div>
      <LoginImage />
    </>
  );
}
