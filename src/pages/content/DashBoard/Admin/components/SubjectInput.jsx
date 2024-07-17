import React, { useEffect, useState } from "react";
import styles from "./SubjectInput.module.css";
import { useForm } from "react-hook-form";
import {
  needToStudyCountList,
  needToStudySubjectCountHandle,
  subjectGrade,
} from "./AdminSubjectInputList";
import InputList1 from "./InputList1";
import InputList2 from "./InputList2";
import useGetDocs from "../../../../../hooks/useGetDocs";
import useSetChildDoc from "../../../../../hooks/useSetChildDoc";
import useSetDoc from "../../../../../hooks/useSetDoc";
import useUpdateDoc from "../../../../../hooks/useUpdateDoc";
import useDeleteDoc from "../../../../../hooks/useDeleteDoc";
import useGetAdminSubjectDocsByYear from "../../../../../hooks/useGetAdminSubjectDocsByYear";

export default function SubjectInput({
  univ,
  major,
  selectedYear,
  preDefaultValue,
  deleteYogang,
  index,
}) {
  const [currentInput, setCurrentInput] = useState(null);
  const [subjectList, setSubjectList] = useState([]);
  const [defaultValue, setDefaultValue] = useState(preDefaultValue);

  const { register, handleSubmit } = useForm();

  const subjectTypeHandle = async () => {
    let subjectType = [];
    const subjectTypeData = await useGetDocs("optional_subject");
    subjectTypeData.forEach((data) => subjectType.push(data));

    setSubjectList(subjectType);
  };

  const setSubjectTypeHandle = (e) => {
    setCurrentInput({
      ...currentInput,
      ...subjectList[Number(e.target.value)],
    });
  };

  const yogangInputList = [
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

  const deleteSubjectHandle = async (i) => {
    let yogangData = await needToStudySubjectCountHandle(
      univ,
      major.name,
      selectedYear
    );

    let yogangIndex = 1;

    if (yogangData[index] == undefined) {
      if (yogangData.length == 0) {
        yogangIndex = 1;
      } else {
        yogangIndex = yogangData[yogangData.length - 1].id + 1;
      }
    } else {
      yogangIndex = yogangData[index].id;
    }

    await useDeleteDoc(
      `admin_subject/${selectedYear}/${univ}/${major.name}/yogang/${yogangIndex}/subject/${defaultValue[i].name}`
    );

    let newDefaultValue = await useGetDocs(
      `admin_subject/${selectedYear}/${univ}/${major.name}/yogang/${yogangIndex}/subject`
    );

    if (newDefaultValue.length == 0) {
      await useDeleteDoc(
        `admin_subject/${selectedYear}/${univ}/${major.name}/yogang/${yogangIndex}`
      );

      newDefaultValue = null;
    }

    deleteYogang();
  };

  const setCurrentInputHandle = async (data) => {
    const { needToStudySubjectCount, subjectGrade } = data;
    if (needToStudySubjectCount == "DEFAULT" || subjectGrade == "DEFAULT")
      return alert("과목과 등급을 선택해 주세요");

    let yogangData = await needToStudySubjectCountHandle(
      univ,
      major.name,
      selectedYear
    );

    let yogangIndex = 1;

    if (yogangData[index] == undefined) {
      if (yogangData.length == 0) {
        yogangIndex = 1;
      } else {
        yogangIndex = yogangData[yogangData.length - 1].id + 1;
      }
    } else {
      yogangIndex = yogangData[index].id;
    }

    let newData = {
      ...data,
      ...currentInput,
    };

    let majorNeedStudyData = {
      needToStudy: needToStudySubjectCount,
      id: yogangIndex,
    };

    await useSetChildDoc(
      "admin_subject",
      `${selectedYear}`,
      univ,
      `${major.name}/yogang/${yogangIndex}/subject/${currentInput.name}`,
      newData
    );

    await useUpdateDoc(
      "admin_subject",
      `${selectedYear}/${univ}/${major.name}/yogang/${yogangIndex}`,
      majorNeedStudyData
    ).catch((e) => {
      if (e.code == "not-found") {
        useSetDoc(
          "admin_subject",
          `${selectedYear}/${univ}/${major.name}/yogang/${yogangIndex}`,
          {
            needToStudy: needToStudySubjectCount,
            id: yogangIndex,
          }
        );
      }
    });

    let newDefaultValue = await useGetDocs(
      `admin_subject/${selectedYear}/${univ}/${major.name}/yogang/${yogangIndex}/subject`
    );

    setDefaultValue(newDefaultValue);

    alert("입력을 완료했습니다.");
  };

  useEffect(() => {
    subjectTypeHandle();
    setDefaultValue(preDefaultValue);
  }, [preDefaultValue, selectedYear]);

  return (
    <form
      onSubmit={handleSubmit((data) => setCurrentInputHandle(data))}
      className={styles["subject-input"]}
    >
      <div className={styles["input-container"]}>
        <ul>
          {yogangInputList.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              {item.inputType == 0 && <InputList1 item={item} />}
              {item.inputType == 1 && <InputList2 item={item} />}
            </React.Fragment>
          ))}
        </ul>
        <button type="submit">과목 추가하기</button>
        {/* <p className={styles.delete} onClick={() => onClick(index)}>
          요강 삭제하기
        </p> */}
      </div>
      {defaultValue !== null && (
        <div className={styles["scroll-box"]}>
          <div>
            {defaultValue.map((item, index) => (
              <li key={index} onClick={() => deleteSubjectHandle(index)}>
                <p>{item.name}</p>
                <p>{item.subjectGrade} 등급</p>
              </li>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
