import { useContext, useEffect, useState } from "react";
import { gradeType, subjectYear } from "./UserHighInputList";
import styles from "./UserHighInput.module.css";
import { useForm } from "react-hook-form";
import useGetDocs from "../../../../../hooks/useGetDocs";
import UserContext from "../../../../../components/context/UserContext";
import useSetChildDoc from "../../../../../hooks/useSetChildDoc";
import SubjectList from "./SubjectList";

export default function SubjectInput() {
  const ctx = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const { userData, setUpUserData } = ctx;
  const [subjectType, setSubjectType] = useState([]);

  const value = {
    title: "과목",
    items: [
      {
        title: "과목 유형",
        name: "subjectType",
        inputType: 1,
        optionList: subjectType,
      },
      {
        title: "과목 등급",
        name: "subjectGrade",
        inputType: 1,
        optionList: gradeType,
      },
    ],
  };

  const getSubjectTypeFunc = async () => {
    const subjectTypeData = await useGetDocs("optional_subject");
    let subjectType = [];
    subjectTypeData.forEach((data) => subjectType.push(data.name));

    setSubjectType(subjectType);
  };

  const setSubjectHandle = async (data) => {
    // 과목 중복 방지 코드 필수
    try {
      await useSetChildDoc(
        "users",
        userData.id,
        "subject",
        data.subjectType,
        data
      );
      await ctx.getUserSubject();
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
      onSubmit={handleSubmit((data) => setSubjectHandle(data))}
    >
      <div className={styles["input-container"]}>
        <p className={styles.title}>{value.title}</p>
        <ul>
          <select
            className={styles["subject-year"]}
            // {...register("subjectYear", { required: true })}
            // required
          >
            {subjectYear.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
          {value.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <p>{item.title}</p>
              <div className={styles["input-label"]}>
                <label>{item.title}*</label>
                <select {...register(item.name, { required: true })} required>
                  {item.optionList != null && (
                    <>
                      {item.optionList.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </li>
          ))}
        </ul>
        <SubjectList />
      </div>
      <div className={styles["button-container"]}>
        <button type="submit">과목 추가하기</button>
      </div>
    </form>
  );
}
