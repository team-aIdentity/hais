import styles from "./AdminSubjectInput.module.css";

import React, { useContext, useEffect, useState } from "react";
import {
  subjectGrade,
  majorOfUnivHandle,
  needToStudyCountList,
} from "./AdminSubjectInputList";

import { useForm } from "react-hook-form";
import useGetDocs from "../../../../../hooks/useGetDocs";
import AdminContext from "../../../../../components/context/AdminContext";
import InputList2 from "./InputList2";
import InputList1 from "./InputList1";
import useSetChildDoc from "../../../../../hooks/useSetChildDoc";
import useUpdateDoc from "../../../../../hooks/useUpdateDoc";
import useSetDoc from "../../../../../hooks/useSetDoc";

export default function AdminSubjectList() {
  const ctx = useContext(AdminContext);

  const { univ } = ctx;
  const [adminUnivInput, setAdminUnivInput] = useState();
  const [majorList, setMajorList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectInput, setSubjectInput] = useState("");

  const { register, handleSubmit } = useForm();

  const setMajorListHandle = async (e) => {
    let index = Number(e.target.value);
    let value = univ[index];
    setAdminUnivInput(value.name);
    const newMajorList = await majorOfUnivHandle(value);

    setMajorList(newMajorList);
  };

  const setSubjectTypeHandle = (e) => {
    let index = Number(e.target.value);
    let data = subjectList[index];

    setSubjectInput(data);
  };

  const subjectTypeHandle = async () => {
    let subjectType = [];
    const subjectTypeData = await useGetDocs("optional_subject");
    subjectTypeData.forEach((data) => subjectType.push(data));

    setSubjectList(subjectType);
  };

  const inputList = [
    {
      title: "대학교",
      name: "univType",
      optionList: univ,
      inputType: 0,
      onChange: setMajorListHandle,
    },
    {
      title: "학과명",
      name: "majorType",
      optionList: majorList.length
        ? majorList
        : [{ name: "대학을 선택해 주세요." }],
      inputType: 1,
      register: register,
    },
    {
      title: "필요한 과목 수",
      name: "needToStudySubjectCount",
      optionList: needToStudyCountList,
      inputType: 1,
      register: register,
    },
    {
      title: "과목명",
      name: "subjectType",
      optionList: subjectList,
      inputType: 0,
      onChange: setSubjectTypeHandle,
    },
    {
      title: "과목등급",
      name: "subjectGrade",
      optionList: subjectGrade,
      inputType: 1,
      register: register,
    },
  ];

  const setAdminSubjectList = async (data) => {
    const { majorType, needToStudySubjectCount } = data;

    if (majorType == "대학을 선택해 주세요.") {
      alert("대학을 선택해 주세요.");
    } else if (subjectInput == "") {
      alert("과목을 선택해 주세요.");
    } else {
      let newData = {
        ...data,
        ...subjectInput,
      };
      let majorNeedStudyData = {
        [majorType]: needToStudySubjectCount,
      };
      await useSetChildDoc(
        "admin_subject",
        adminUnivInput,
        majorType,
        subjectInput.name,
        newData
      );
      await useUpdateDoc(
        "admin_subject",
        adminUnivInput,
        majorNeedStudyData
      ).catch((e) => {
        if (e.code == "not-found") {
          useSetDoc("admin_subject", adminUnivInput, majorNeedStudyData);
        }
      });

      alert("입력을 완료했습니다.");
    }
  };

  useEffect(() => {
    subjectTypeHandle();
  }, []);

  return (
    <div className={styles["item-container"]}>
      <div className={styles["input-container"]}>
        <p className={styles.title}>대학 및 학과 별 과목 입력</p>
        <ul>
          <form onSubmit={handleSubmit((data) => setAdminSubjectList(data))}>
            {inputList.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                {item.inputType == 0 && <InputList1 item={item} />}
                {item.inputType == 1 && <InputList2 item={item} />}
              </React.Fragment>
            ))}
            <div className={styles["button-container"]}>
              <button type="submit">과목 추가하기</button>
            </div>
          </form>
        </ul>
      </div>
    </div>
  );
}
