import { useContext, useEffect, useState } from "react";
import { gradeType } from "./UserHighInputList";
import styles from "./UserHighInput.module.css";
import useGetDocs from "../../../../../hooks/useGetDocs";
import UserContext from "../../../../../components/context/UserContext";
import useSetChildDoc from "../../../../../hooks/useSetChildDoc";
import SubjectList from "./SubjectList";

export default function SubjectInput() {
  const ctx = useContext(UserContext);

  const { userData, userSubject, getUserSubject } = ctx;
  const [subjectType, setSubjectType] = useState([]);

  const [subjectInput, setSubjectInput] = useState({});

  const setSubjectTypeHandle = (e) => {
    let inputSubject = subjectType[e.target.value];
    setSubjectInput({
      ...subjectInput,
      ...inputSubject,
    });
  };

  const setSubjectGradeHandle = (e) => {
    const grade = Number(e.target.value) + 1;
    setSubjectInput({
      ...subjectInput,
      subjectGrade: grade,
    });
  };

  const value = {
    title: "과목",
    items: [
      {
        title: "과목 유형",
        name: "subjectType",
        optionList: subjectType,
        onchange: setSubjectTypeHandle,
      },
      {
        title: "과목 등급",
        name: "subjectGrade",
        optionList: gradeType,
        onchange: setSubjectGradeHandle,
      },
    ],
  };

  const getSubjectTypeFunc = async () => {
    const subjectTypeData = await useGetDocs("optional_subject");
    let subjectType = [];
    subjectTypeData.forEach((data) => subjectType.push(data));

    setSubjectType(subjectType);
  };

  const setSubjectHandle = async (e) => {
    try {
      e.preventDefault();
      await useSetChildDoc(
        "users",
        userData.id,
        "subject",
        subjectInput.name,
        subjectInput
      );
      await getUserSubject();
    } catch (e) {
      console.log("Subject Input >>>>> " + e);
    }
  };

  useEffect(() => {
    getSubjectTypeFunc(); // 비동기 함수 호출
  }, []);

  return (
    <form
      className={styles["item-container"]}
      onSubmit={(e) => setSubjectHandle(e)}
    >
      <div className={styles["input-container"]}>
        <p className={styles.title}>{value.title}</p>
        <ul>
          {value.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <p>{item.title}</p>
              <div className={styles["input-label"]}>
                <label>{item.title}*</label>
                <select onChange={(e) => item.onchange(e)} required>
                  {item.optionList.map((option, optionIndex) => (
                    <option key={optionIndex} value={optionIndex}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
        <SubjectList subjectList={ctx.userSubject} />
      </div>
      <div className={styles["button-container"]}>
        <button type="submit">과목 추가하기</button>
      </div>
    </form>
  );
}
