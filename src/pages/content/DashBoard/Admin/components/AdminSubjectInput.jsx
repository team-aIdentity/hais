import styles from "./AdminSubjectInput.module.css";

import React, { useContext, useState } from "react";
import { majorOfUnivHandle, subjectYear } from "./AdminSubjectInputList";

import AdminContext from "../../../../../components/context/AdminContext";
import InputList1 from "./InputList1";
import useGetAdminSubjectDocsByYear from "../../../../../hooks/useGetAdminSubjectDocsByYear";
import SubjectInput from "./SubjectInput";
import useGetDocs from "../../../../../hooks/useGetDocs";

export default function AdminSubjectList() {
  const ctx = useContext(AdminContext);

  const { univ } = ctx;
  const [currentUniv, setCurrentUniv] = useState(null);
  const [currentMajor, setCurrentMajor] = useState(null);
  const [majorList, setMajorList] = useState([]);
  const [inputSubjectYear, setInputSubjectYear] = useState(subjectYear[0]);
  const [adminInputSubjectList, setAdminInputSubjectList] = useState([]);

  const setCurrentUnivHandle = async (e) => {
    let index = Number(e.target.value);
    let value = univ[index];
    setCurrentUniv(value.name);

    const newMajorList = await majorOfUnivHandle(value);
    setMajorList(newMajorList);
  };

  const setCurrentMajorHandle = (e) => {
    setCurrentMajor(majorList[Number(e.target.value)]);
  };

  const getAdminSubjectHandle = async (selectedYear) => {
    if (currentUniv == null || currentMajor == null)
      return alert("대학과 학과를 선택해 주세요");

    // let defaultSubjectData = await useGetDocs(
    //   `admin_subject/${selectedYear}/${currentUniv}/${currentMajor.name}/yogang`
    // );

    let defaultSubjectData = await useGetAdminSubjectDocsByYear(
      selectedYear,
      currentUniv,
      currentMajor.name
    );

    defaultSubjectData.push(null);

    setAdminInputSubjectList(defaultSubjectData);
  };

  const selectSubjectearHandle = async (e) => {
    const selectedYear = e.target.value;
    setInputSubjectYear(selectedYear);
    getAdminSubjectHandle(selectedYear);
  };

  const getAdminSubjectList = (e) => {
    e.preventDefault();
    getAdminSubjectHandle(inputSubjectYear); // 없예도 되는지 테스트
    //defaultValue 불러오는 코드
  };

  const deleteYogangHandle = async () => {
    getAdminSubjectHandle(inputSubjectYear);
  };

  const inputList = [
    {
      title: "대학교",
      name: "univType",
      optionList: univ,
      onChange: setCurrentUnivHandle,
    },
    {
      title: "학과명",
      name: "majorType",
      optionList: majorList,
      onChange: setCurrentMajorHandle,
    },
  ];

  return (
    <div className={styles["item-container"]}>
      <div className={styles["input-container"]}>
        <p className={styles.title}>대학 및 학과 별 과목 입력</p>
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
        <ul className={styles["subject-input"]}>
          {inputList.map((item, itemIndex) => (
            <InputList1 item={item} key={itemIndex} />
          ))}
          <div className={styles["button-container"]}>
            <button onClick={(e) => getAdminSubjectList(e)}>
              요강 추가하기
            </button>
          </div>
        </ul>
        {adminInputSubjectList.length !== 0 && (
          <div className={styles.wrapper}>
            {adminInputSubjectList.map((item, index) => (
              <SubjectInput
                univ={currentUniv}
                major={currentMajor}
                selectedYear={inputSubjectYear}
                preDefaultValue={item}
                index={index}
                deleteYogang={deleteYogangHandle}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
