import styles from "./AdminSubjectInput.module.css";

import { useContext, useEffect, useState } from "react";
import { subjectGrade, majorOfUnivHandle } from "./AdminSubjectInputList";

import { useForm } from "react-hook-form";
import useGetDocs from "../../../../../hooks/useGetDocs";
import AdminContext from "../../../../../components/context/AdminContext";
import InputList2 from "./InputList2";
import InputList1 from "./InputList1";

export default function AdminSubjectList() {
  const ctx = useContext(AdminContext);

  const { univ } = ctx;
  const [majorList, setMajorList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const { register, handleSubmit } = useForm();

  const setMajorListHandle = async (e) => {
    const newMajorList = await majorOfUnivHandle(e);
    setMajorList(newMajorList);
  };

  const subjectTypeHandle = async () => {
    let subjectType = [];
    const subjectTypeData = await useGetDocs("optional_subject");
    subjectTypeData.forEach((data) => subjectType.push(data));

    setSubjectList(subjectType);
  };

  const univInput = {
    title: "대학교",
    name: "univType",
    optionList: univ,
    onChange: setMajorListHandle,
  };

  const inputList = [
    {
      title: "학과명",
      name: "majorType",
      optionList: majorList.length
        ? majorList
        : [{ name: "대학을 선택해 주세요." }],
      register: register,
    },
    {
      title: "과목명",
      name: "subjectType",
      optionList: subjectList,
      register: register,
    },
    {
      title: "과목등급",
      name: "subjectGrade",
      optionList: subjectGrade,
      register: register,
    },
  ];

  useEffect(() => {
    subjectTypeHandle();
  }, []);

  return (
    <div className={styles["item-container"]}>
      <div className={styles["input-container"]}>
        <p className={styles.title}>대학 및 학과 별 과목 입력</p>
        <ul>
          <InputList1 item={univInput} />
          {inputList.map((item, itemIndex) => (
            <InputList2 key={itemIndex} item={item} />
          ))}
        </ul>
        <form>
          <div className={styles["button-container"]}>
            <button type="submit">과목 추가하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
