import styles from "./UserHigh.module.css";

import calendarImg from "../../../../assets/calendar.png";
import mailImg from "../../../../assets/mail.png";
import groupImg from "../../../../assets/group.png";
import searchImg from "../../../../assets/search.png";
import bookmarkImg from "../../../../assets/bookmark.png";
import bellImg from "../../../../assets/bell.png";
import dummyProfile from "../../../../assets/dummy_profile.png";
import buttonIconChecked from "../../../../assets/button_icon_true.png";
import buttonIconUnChecked from "../../../../assets/button_icon_false.png";
import { useState } from "react";

const buttonIconList1 = [calendarImg, mailImg, groupImg];
const buttonIconList2 = [searchImg, bookmarkImg, bellImg];
const adminItemList = [
  {
    title: "학교",
    items: [
      "학교 이름",
      "학교 설명",
      "학교 유형",
      "학교 유형",
      "관할지역",
      "우편번호",
      "주소 1",
      "주소 2",
      "web1",
      "web2",
      "web3",
      "관리자 이메일",
    ],
  },
  {
    title: "과목",
    items: [
      "과목 이름",
      "과목 설명",
      "과목 유형",
      "과목 분류",
      "과목 학년",
      "과목 학점",
      "관리자 이메일",
    ],
  },
  {
    title: "연도",
    items: ["연도", "학교", "대학교", "과목유형", "우편번호", "관리자 이메일"],
  },
];

export default function UserHigh() {
  const [schoolTypeCheck, setSchoolTypeCheck] = useState([false, false]);

  const checkSchoolTypeHandler = (index) => {
    if (!schoolTypeCheck[0] && !schoolTypeCheck[1]) {
      let newSchoolTypeCheck = [false, false];
      newSchoolTypeCheck[index] = true;
      setSchoolTypeCheck(newSchoolTypeCheck);
    } else if (schoolTypeCheck[index] == true) return;
    else {
      let newSchoolTypeCheck = [false, false];
      newSchoolTypeCheck[index] = true;
      setSchoolTypeCheck(newSchoolTypeCheck);
    }
  };

  return (
    <div className={styles.high}>
      <div className={styles.header}>
        <div className={styles["button-container"]}>
          {buttonIconList1.map((value, index) => (
            <button key={index}>
              <img src={value} alt="icon-image" />
            </button>
          ))}
        </div>
        <div className={styles["button-container-wrap"]}>
          <div className={styles["button-container"]}>
            {buttonIconList2.map((value, index) => (
              <button key={index}>
                <img src={value} alt="icon-image" />
              </button>
            ))}
          </div>
          <div className={styles.profile}>
            <div>
              <p className={styles.title}>Dummy_Name</p>
              <p className={styles["sub-title"]}>Dummy_Admin</p>
            </div>
            <img src={dummyProfile} alt="profile" />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {adminItemList.map((value, index) => (
          <li className={styles["item-container"]} key={index}>
            <p className={styles.title}>{value.title}</p>
            {index == 0 && (
              <ul>
                {value.items.map((value, index) => (
                  <li key={index}>
                    <p>{value}</p>
                    {index != 3 ? (
                      <div className={styles["input-label"]}>
                        <label>{value}*</label>
                        <input
                          type="text"
                          name={value}
                          placeholder="빈칸을 입력해 주세요"
                          // value={email}
                          // onChange={handleChange}
                          // ref={(el) =>}
                        />
                      </div>
                    ) : (
                      <div className={styles["input-label-2"]}>
                        <button onClick={() => checkSchoolTypeHandler(0)}>
                          <img
                            src={
                              schoolTypeCheck[0]
                                ? buttonIconChecked
                                : buttonIconUnChecked
                            }
                            alt="check-img"
                          />
                        </button>
                        <p>사립학교</p>
                        <button onClick={() => checkSchoolTypeHandler(1)}>
                          <img
                            src={
                              schoolTypeCheck[1]
                                ? buttonIconChecked
                                : buttonIconUnChecked
                            }
                            alt="check-img"
                          />
                        </button>
                        <p>공립학교</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {index != 0 && (
              <ul>
                {value.items.map((value, index) => (
                  <li key={index}>
                    <p>{value}</p>
                    <div className={styles["input-label"]}>
                      <label>{value}*</label>
                      <input
                        type="text"
                        name={value}
                        placeholder="빈칸을 입력해 주세요"
                        // value={email}
                        // onChange={handleChange}
                        // ref={(el) =>}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </div>
    </div>
  );
}
