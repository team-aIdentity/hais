import { useContext, useEffect, useState } from "react";
import { gradeType } from "./UserHighInputList";
import styles from "./UserHighInput.module.css";
import { useForm } from "react-hook-form";
import useGetDocs from "../../../../../hooks/useGetDocs";
import UserContext from "../../../../../components/context/UserContext";

export default function SubjectInput() {
  const ctx = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const { userData, setUpUserData } = ctx;
  const [subjectType, setSubjectType] = useState(["로딩 중..."]);

  const value = {
    title: "과목",
    items: [
      {
        title: "과목 유형",
        inputType: 1,
        optionList: subjectType,
      },
      { title: "과목 등급", inputType: 1, optionList: gradeType },
    ],
  };

  useEffect(() => {
    const getFunc = async () => {
      const subjectTypeData = await useGetDocs("optional_subject");
      let subjectType = [];
      subjectTypeData.forEach((data) => subjectType.push(data.name));

      setSubjectType(subjectType);
    };

    getFunc(); // 비동기 함수 호출
  }, []);

  const setSubjectHandle = async (data) => {
    if (data == userData.school) return;

    try {
      await useSetChildDoc("users", userData.id, "subject", "1-2", data);
    } catch (e) {
      console.log("School Input >>>>> " + e);
    }
  };

  return (
    <form
      className={styles["item-container"]}
      onSubmit={handleSubmit((data) => setSubjectHandle(data))}
    >
      <div className={styles["input-container"]}>
        <p className={styles.title}>{value.title}</p>
        <ul>
          {value.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <p>{item.title}</p>
              <div className={styles["input-label"]}>
                <label>{item.title}*</label>
                <select {...register(item.title, { required: true })} required>
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
      </div>
      <div className={styles["button-container"]}>
        <button type="submit">과목 추가하기</button>
      </div>
    </form>
  );
}
