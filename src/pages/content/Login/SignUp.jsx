import styles from "./SignUp.module.css";
import logoImg from "../../../assets/android-chrome-512x512.png";
import navBackImg from "../../../assets/navigate_back.png";

import { useContext, useState } from "react";
import UserContext from "../../../components/context/UserContext";
import { json, useNavigate } from "react-router-dom";
import useCreateAccount from "../../../hooks/useCreateAccount";
import useSetDoc from "../../../hooks/useSetDoc";
import { useForm } from "react-hook-form";
import LoginImage from "./LoginImage";

const SignUpList = [
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "홍길동",
    require: true,
  },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    placeholder: "01012341234",
    require: true,
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    placeholder: "abcd1234@gmail.com",
    require: false,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "8자리 이상 20자리 이하",
    require: true,
  },
  {
    label: "Confirm Password",
    name: "conFirmPassword",
    type: "password",
    placeholder: "한번 더 입력해주세요",
    require: true,
  },
];

export default function SignUp() {
  const userCtx = useContext(UserContext);
  const nav = useNavigate();

  const { register, handleSubmit } = useForm();

  const createUserAccount = async (data) => {
    const { phone, name, email, password } = data;
    const user = await useCreateAccount(email, password);

    const userData = {
      phone: phone,
      name: name,
      email: email,
      accessToken: user.accessToken,
      id: user.uid,
    };

    localStorage.setItem("id", user.uid); //login에 이전

    await useSetDoc("users", user.uid, userData);
    nav("/login");
  };

  const signUpHandler = (data) => {
    const { name, phone, email, password, conFirmPassword } = data;

    const regName = /^[가-힣]+$/;
    const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
    const regEmail = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/;
    const vaildName = name.match(regName);
    const vaildPhone = phone.match(regPhone);
    const vaildEmail = email == "" || email.match(regEmail);
    const vaildConFirmPassword = password == conFirmPassword;
    const vaildPassword = password.length >= 8 && password.length <= 20;

    if (!vaildName) {
      alert("이름을 다시 입력해주세요.");
    } else if (!vaildPhone) {
      alert("번호를 다시 입력해주세요.");
    } else if (!vaildEmail) {
      alert("이메일을 다시 입력해주세요.");
    } else if (!vaildPassword) {
      alert("비밀번호를 다시 입력해주세요.");
    } else if (!vaildConFirmPassword) {
      alert("비밀번호가 서로 다릅니다.");
    } else {
      console.log("SignUp Complete");

      userCtx.setUserData({
        ...userCtx.userData,
        ...data,
      }); // login에 이전

      createUserAccount(data);
    }
  };

  return (
    <>
      <div className={styles.signup}>
        <div className={styles["information-container"]}>
          <div className={styles["navigate-container"]}>
            <button onClick={() => nav("/login")}>
              <img src={navBackImg} alt="back-img" />
            </button>
          </div>
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
          onSubmit={handleSubmit((data) => signUpHandler(data))}
        >
          {SignUpList.map((value, index) => (
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
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <LoginImage />
    </>
  );
}

// Phone을 인증으로 할 시 firebase에서 제공하는 인증방식 활용
// https://firebase.google.com/docs/auth/web/phone-auth?hl=ko&authuser=0&_gl=1*o5pwdo*_ga*OTE0MDI5MzE0LjE3MTQzMDIwNjY.*_ga_CW55HF8NVT*MTcxODc4NjM2NC43NC4xLjE3MTg3ODYzODAuNDQuMC4w
