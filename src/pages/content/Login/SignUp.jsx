import styles from "./SignUp.module.css";
import logoImg from "../../../assets/android-chrome-512x512.png";
import navBackImg from "../../../assets/navigate_back.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    placeholder: "010-1234-1234",
    require: true,
  },
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
    placeholder: "6자리 이상, 20자리 이하",
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
  const nav = useNavigate();

  const { register, handleSubmit } = useForm();

  const createUserAccount = async (data) => {
    const { phone, name, email, password } = data;
    const user = await useCreateAccount(email, password);

    const newPhone = `${phone.split("-")[0]}-${phone.split("-")[1]}-${
      phone.split("-")[2]
    }`;

    const userData = {
      phone: newPhone,
      name: name,
      email: email,
      accessToken: user.accessToken,
      id: user.uid,
      isVerified: false,
    };

    await useSetDoc("users", user.uid, userData);

    nav("/login/verify");
  };

  const [isNotValid, setIsNotValid] = useState(["", "", "", "", ""]);

  const signUpHandler = (data) => {
    let newIsNotValid = ["", "", "", "", ""];
    const { name, phone, email, password, conFirmPassword } = data;

    const regName = /^[가-힣]+$/;
    const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
    const regEmail = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/;
    const vaildName = name.match(regName);
    const vaildPhone = phone.match(regPhone);
    const vaildEmail = email == "" || email.match(regEmail);
    const vaildConFirmPassword = password == conFirmPassword;
    const vaildPassword = password.length >= 6 && password.length <= 20;

    switch (true) {
      case !vaildName:
        newIsNotValid[0] = true;
        setIsNotValid(newIsNotValid);
        break;
      case !vaildPhone:
        newIsNotValid[1] = true;
        setIsNotValid(newIsNotValid);
        break;
      case !vaildEmail:
        newIsNotValid[2] = true;
        setIsNotValid(newIsNotValid);
        break;
      case !vaildPassword:
        newIsNotValid[3] = true;
        setIsNotValid(newIsNotValid);
        break;
      case !vaildConFirmPassword:
        newIsNotValid[4] = true;
        setIsNotValid(newIsNotValid);
        break;
      default:
        setIsNotValid(newIsNotValid);
        console.log("User SignUp Input Complete");
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
