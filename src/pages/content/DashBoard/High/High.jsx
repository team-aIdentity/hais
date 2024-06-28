import styles from "./High.module.css";

import calendarImg from "../../../../assets/calendar.png";
import mailImg from "../../../../assets/mail.png";
import groupImg from "../../../../assets/group.png";
import searchImg from "../../../../assets/search.png";
import bookmarkImg from "../../../../assets/bookmark.png";
import bellImg from "../../../../assets/bell.png";
import dummyProfile from "../../../../assets/dummy_profile.png";
import UserHighInput from "./components/UserHighInput";
import { useContext, useEffect } from "react";
import UserContext from "../../../../components/context/UserContext";

export default function High() {
  const { getUserSubject, userData } = useContext(UserContext);
  const btn = (iconList) => {
    return (
      <div className={styles["button-container"]}>
        {iconList.map((value, index) => (
          <button key={index}>
            <img src={value} alt="icon-image" />
          </button>
        ))}
      </div>
    );
  };

  const buttonIconList1 = btn([calendarImg, mailImg, groupImg]);
  const buttonIconList2 = btn([searchImg, bookmarkImg, bellImg]);

  useEffect(() => {
    getUserSubject();
  }, []);

  return (
    <div className={styles.high}>
      <div className={styles.header}>
        {buttonIconList1}
        <div className={styles["button-container-wrap"]}>
          {buttonIconList2}
          <div className={styles.profile}>
            <div>
              <p className={styles.title}>{userData.name}</p>
              <p className={styles["sub-title"]}>{userData.email}</p>
            </div>
            <img src={dummyProfile} alt="profile" />
          </div>
        </div>
      </div>
      <UserHighInput />
    </div>
  );
}
