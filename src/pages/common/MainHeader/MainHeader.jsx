import logoImg from "../../../assets/android-chrome-512x512.png";
import profileImg from "../../../assets/dummy_profile.png";
import logoutImg from "../../../assets/logout.png";

import userCircle from "../../../assets/user-circle.png";
import userGroup from "../../../assets/user-group.png";
import userPencil from "../../../assets/user-pencil.png";
import userAcademicCap from "../../../assets/user-academic-cap.png";

import styles from "./MainHeader.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../../components/context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../components/firebase/firebase";

export default function MainHeader() {
  const userData = useContext(UserContext).userData;
  const nav = useNavigate();
  const linkItemList = [
    {
      img: userCircle,
      title: "관리자관리",
      to: "admin",
    },
    {
      img: userPencil,
      title: "과목 및 학과추가",
      to: "add-data",
    },
    {
      img: userGroup,
      title: "회원관리",
      to: "member",
    },
    {
      img: userPencil,
      title: "과목별 확인",
      to: "subject",
    },
    {
      img: userAcademicCap,
      title: "과목 입력",
      to: "high",
    },
  ];

  const [listActiveList, setListActiveList] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const listActiveListHandler = (index) => {
    let newListActiveList = [false, false, false, false, false];
    newListActiveList[index] = true;
    setListActiveList(newListActiveList);
  };

  const logoutHandle = (e) => {
    e.preventDefault();

    if (confirm("로그아웃을 하시겠습니까?") == true) {
      localStorage.removeItem("loginedId");

      nav("/login");

      signOut(auth);
    } else {
      return;
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles["title-container"]}>
        <img src={logoImg} alt="logo" />
        <p>고교학점제 관리</p>
        <button onClick={(e) => logoutHandle(e)}>
          <img src={logoutImg} alt="logo" />
        </button>
      </div>
      <div className={styles["profile-container"]}>
        <img src={profileImg} alt="profile" />
        <p className={styles.name}>{userData.name}</p>
        <p className={styles.email}>{userData.email}</p>
      </div>
      <ul>
        {linkItemList.map((value, index) => (
          <li key={index} active={`${listActiveList[index]}`}>
            <Link to={value.to} onClick={() => listActiveListHandler(index)}>
              <img src={value.img} alt="list-logo-img" />
              <p>{value.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
