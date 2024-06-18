import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../components/firebase/firebase";
import { useEffect, useState } from "react";
import { gradeType } from "./UserHighInputList";
import styles from "./UserHighInput.module.css";
import { useForm } from "react-hook-form";

export default function SubjectInput() {
  const [subjectType, setSubjectType] = useState([]);
  const { register, handleSubmit } = useForm();

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
      let subjectType = [];
      const subjectTypeRef = collection(db, "optional_subject");
      const subjectTypeQuery = await getDocs(subjectTypeRef);
      subjectTypeQuery.docs.forEach((doc) => subjectType.push(doc.data().name));
      setSubjectType(subjectType);
    };

    getFunc(); // 비동기 함수 호출
  }, []);

  return (
    <form
      className={styles["item-container"]}
      onSubmit={handleSubmit((data) => console.log(data))}
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
