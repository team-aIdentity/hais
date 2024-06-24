import styles from "./AdminSubjectInput.module.css";

// export default function AdminSubjectInput() {
//   return <div className={styles["admin-subject-input"]}></div>;
// }

import { useContext, useEffect, useState } from "react";
import { gradeType, subjectYear } from "./AdminSubjectInputList";
import { useForm } from "react-hook-form";
import useGetDocs from "../../../../../hooks/useGetDocs";
import AdminContext from "../../../../../components/context/AdminContext";
import useSetChildDoc from "../../../../../hooks/useSetChildDoc";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../components/firebase/firebase";
import InputList from "./InputList";

export default function AdminSubjectList() {
  const ctx = useContext(AdminContext);
  // const { register, handleSubmit } = useForm();

  const { univ } = ctx;
  const [major, setMajor] = useState([]);

  const inputList = {
    title: "대학",
    items: [
      {
        title: "대학교",
        name: "univType",
        inputType: 1,
        optionList: univ,
      },
      // {
      //   title: "학과",
      //   name: "majorType",
      //   inputType: 1,
      //   optionList: "",
      // },
    ],
  };
  //   {
  //     title: "과목",
  //     items: [
  //       {
  //         title: "과목 유형",
  //         name: "subjectType",
  //         inputType: 1,
  //         optionList: subjectType,
  //       },
  //       {
  //         title: "과목 등급",
  //         name: "subjectGrade",
  //         inputType: 1,
  //         optionList: gradeType,
  //       },
  //     ],
  //   }

  const getSubjectTypeFunc = async () => {
    const subjectTypeData = await useGetDocs("optional_subject");
    let subjectType = [];
    subjectTypeData.forEach((data) => subjectType.push(data.name));
  };

  // const setSubjectHandle = async (data) => {
  //   try {
  //     await useSetChildDoc(
  //       "admin",
  //       userData.id,
  //       "subject",
  //       data.subjectType,
  //       data
  //     );
  //     // await ctx.getUserSubject();
  //   } catch (e) {
  //     console.log("Subject Input >>>>> " + e);
  //   }
  // };

  const majorOfUnivHandle = async (e) => {
    const majorList = [];
    const currentUniv = e.target.value;
    const majorQuery = await query(
      collection(db, "majors"),
      where("univ", "==", `${currentUniv}`)
    );
    const majorSnapShot = await getDocs(majorQuery);
    majorSnapShot.docs.forEach((doc) => majorList.push(doc.data()));

    return majorList;
  };

  useEffect(() => {
    getSubjectTypeFunc(); // 비동기 함수 호출
  }, []);

  return (
    <form
      className={styles["item-container"]}
      // onSubmit={handleSubmit((data) => setSubjectHandle(data))}
    >
      <div className={styles["input-container"]}>
        <p className={styles.title}>{inputList.title}</p>
        <ul>
          {inputList.items.map((item, itemIndex) => (
            <InputList key={itemIndex} item={item} itemIndex={itemIndex} />
          ))}
        </ul>
      </div>
      <div className={styles["button-container"]}>
        <button type="submit">과목 추가하기</button>
      </div>
    </form>
  );
}
