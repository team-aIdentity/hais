import { useContext, useEffect, useState } from "react";
import { creditType, gradeType, subjectYear } from "./UserHighInputList";
import styles from "./SubjectInput.module.css";
import useGetDocs from "../../../../../hooks/useGetDocs";
import UserContext from "../../../../../components/context/UserContext";
import useSetChildDoc from "../../../../../hooks/useSetChildDoc";
import SubjectList from "./SubjectList";
import useGetSubjectDocsByYear from "../../../../../hooks/useGetSubjectDocsByYear";
import useDeleteDoc from "../../../../../hooks/useDeleteDoc";

export default function SubjectInput() {
  const ctx = useContext(UserContext);

  const { userData, userSubject, setUserSubject, getUserSubject } = ctx;
  const [subjectType, setSubjectType] = useState([]);
  const [inputSubjectYear, setInputSubjectYear] = useState(subjectYear[0]);
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

  const setSubjectCreditHandle = (e) => {
    setSubjectInput({
      ...subjectInput,
      subjectCredit: Number(e.target.value) + 1,
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
      {
        title: "과목 학점",
        name: "subjectCredit",
        optionList: creditType,
        onchange: setSubjectCreditHandle,
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

      if (
        subjectInput.name == undefined ||
        subjectInput.subjectGrade == undefined ||
        subjectInput.subjectCredit == undefined
      )
        return alert("과목과 등급과 학점을 입력해주세요.");

      await useSetChildDoc(
        "users",
        userData.id,
        "subject",
        `${inputSubjectYear}/subject/${subjectInput.name}`,
        subjectInput
      );

      const defaultSubjectData = await useGetSubjectDocsByYear(
        userData.id,
        inputSubjectYear
      );

      setUserSubject(defaultSubjectData);
    } catch (e) {
      console.log("Subject Input >>>>> " + e);
    }
  };

  const selectSubjectearHandle = async (e) => {
    const selectedYear = e.target.value;
    setInputSubjectYear(selectedYear);
    const defaultSubjectData = await useGetSubjectDocsByYear(
      userData.id,
      selectedYear
    );

    setUserSubject(defaultSubjectData);
  };

  const deleteSubjectHandle = async (index) => {
    let newSubject = userSubject[index];

    await useDeleteDoc(
      `users/${userData.id}/subject/${inputSubjectYear}/subject/${newSubject.name}`
    );

    const defaultSubjectData = await useGetSubjectDocsByYear(
      userData.id,
      inputSubjectYear
    );

    setUserSubject(defaultSubjectData);
  };

  useEffect(() => {
    getSubjectTypeFunc(); // 비동기 함수 호출
    getUserSubject();
  }, []);

  return (
    <div className={styles.body}>
      <form
        className={styles["item-container"]}
        onSubmit={(e) => setSubjectHandle(e)}
      >
        <div className={styles["input-container"]}>
          <p className={styles.title}>{value.title}</p>
          <select
            className={styles["subject-year"]}
            onChange={(e) => selectSubjectearHandle(e)}
            value={inputSubjectYear}
            required
          >
            {subjectYear.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ul>
            {value.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <p>{item.title}</p>
                <div className={styles["input-label"]}>
                  <label>{item.title}*</label>
                  <select
                    onChange={(e) => item.onchange(e)}
                    required
                    defaultValue="DEFALUT"
                  >
                    <option value="DEFALUT" disabled>
                      선택해 주세요
                    </option>
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
          <SubjectList
            subjectList={ctx.userSubject}
            deleteSubjectHandle={deleteSubjectHandle}
          />
        </div>
        <div className={styles["button-container"]}>
          <button type="submit">과목 추가하기</button>
        </div>
      </form>
    </div>
  );
}
