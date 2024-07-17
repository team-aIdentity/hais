import { useContext, useState } from "react";
import styles from "./UnivInput.module.css";
import InputList1 from "./InputList1";
import { majorOfUnivHandle, subjectYear } from "./SubjectInputList";
import AdminContext from "../../../../../components/context/AdminContext";
import useGetSubjectDocsByYear from "../../../../../hooks/useGetSubjectDocsByYear";
import useGetAdminSubjectDocsByYear from "../../../../../hooks/useGetAdminSubjectDocsByYear";
import UserContext from "../../../../../components/context/UserContext";
import SubjectResult from "./SubjectResult";

export default function UnivInput() {
  const adminCtx = useContext(AdminContext);
  const userCtx = useContext(UserContext);
  const { univ } = adminCtx;
  const { userData, setUserSubject } = userCtx;

  const [currentUnivInput, setCurrentUnivInput] = useState();
  const [currentMajorInput, setCurrentMajorInput] = useState();
  const [currentYogangInput, setCurrentYogangInput] = useState();
  const [majorList, setMajorList] = useState([]);
  const [yogangList, setYogangList] = useState([]);

  const [currentUnivMajor, setCurrentUnivMajor] = useState();
  const [inputYear, setInputYear] = useState(subjectYear[0]);

  const setMajorListHandle = async (e) => {
    setCurrentUnivInput(e.target.value);
    const newMajorList = await majorOfUnivHandle(e);
    setMajorList(newMajorList);
  };

  const setCurrentMajorHandle = async (e) => {
    let data = [];
    let major = e.target.value;
    setCurrentMajorInput(major);

    const yogangData = await useGetAdminSubjectDocsByYear(
      inputYear,
      currentUnivInput,
      major
    );

    for (let i = 0; i < yogangData.length; i++) {
      data.push({
        name: `${i + 1} 번째 요강`,
      });
    }
    setYogangList(data);
  };

  const setCurrentYogangHandle = async (e) => {
    setCurrentYogangInput(Number(e.target.value[0]) - 1);
  };

  const setCurrentUnivMajorHandle = () => {
    if (
      currentMajorInput == undefined ||
      currentUnivInput == undefined ||
      currentYogangInput == undefined
    )
      return alert("대학교와 학과를 선택해 주세요");

    setCurrentUnivMajor({
      univ: currentUnivInput,
      major: currentMajorInput,
      yogang: currentYogangInput,
      selectedYear: inputYear,
    });
  };

  const selectSubjectearHandle = async (e) => {
    const selectedYear = e.target.value;
    setInputYear(selectedYear);

    const defaultSubjectData = await useGetSubjectDocsByYear(
      userData.id,
      selectedYear
    );

    setUserSubject(defaultSubjectData);
  };

  const univInput = [
    {
      title: "대학교",
      name: "univType",
      optionList: univ,
      onChange: setMajorListHandle,
    },
    {
      title: "학과명",
      name: "majorType",
      optionList: majorList,
      onChange: setCurrentMajorHandle,
    },
    {
      title: "요강",
      name: "yogangType",
      optionList: yogangList,
      onChange: setCurrentYogangHandle,
    },
  ];

  return (
    <div className={styles["item-container"]}>
      <div className={styles["input-container"]}>
        <p className={styles.title}>추천 과목 확인하기</p>
        <select
          className={styles["subject-year"]}
          onChange={(e) => selectSubjectearHandle(e)}
          value={inputYear}
          required
        >
          {subjectYear.map((option, optionIndex) => (
            <option key={optionIndex} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ul>
          {univInput.map((value, index) => (
            <InputList1 item={value} key={index} />
          ))}
        </ul>
        <div className={styles["button-container"]}>
          <button type="button" onClick={() => setCurrentUnivMajorHandle()}>
            내 정보와 비교하기
          </button>
        </div>
      </div>
      {currentUnivMajor != undefined && (
        <SubjectResult currentUnivMajor={currentUnivMajor} />
      )}
    </div>
  );
}
