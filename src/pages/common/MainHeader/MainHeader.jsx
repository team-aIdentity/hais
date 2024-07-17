import logoImg from "../../../assets/android-chrome-512x512.png";
import profileImg from "../../../assets/dummy_profile.png";

import userCircle from "../../../assets/user-circle.png";
import userGroup from "../../../assets/user-group.png";
import userPencil from "../../../assets/user-pencil.png";
import userAcademicCap from "../../../assets/user-academic-cap.png";

import styles from "./MainHeader.module.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../../components/context/UserContext";

export default function MainHeader() {
  const userData = useContext(UserContext).userData;
  const linkItemList = [
    {
      img: userCircle,
      title: "관리자관리",
      to: "admin",
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
  ]);

  const listActiveListHandler = (index) => {
    let newListActiveList = [false, false, false, false];
    newListActiveList[index] = true;
    setListActiveList(newListActiveList);
  };

  return (
    <div className={styles.header}>
      <div className={styles["title-container"]}>
        <img src={logoImg} alt="logo" />
        <p>고교학점제 관리</p>
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
