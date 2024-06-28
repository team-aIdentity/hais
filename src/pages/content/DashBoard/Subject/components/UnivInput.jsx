import { useContext, useState } from "react";
import styles from "./UnivInput.module.css";
import InputList1 from "./InputList1";
import { majorOfUnivHandle } from "./SubjectInputList";
import AdminContext from "../../../../../components/context/AdminContext";

export default function UnivInput({ setCurrentUnivMajor }) {
  const ctx = useContext(AdminContext);
  const { univ } = ctx;

  const [currentUnivInput, setCurrentUnivInput] = useState();
  const [currentMajorInput, setCurrentMajorInput] = useState();
  const [majorList, setMajorList] = useState([]);

  const setMajorListHandle = async (e) => {
    setCurrentUnivInput(e.target.value);
    const newMajorList = await majorOfUnivHandle(e);
    setMajorList(newMajorList);
  };

  const setCurrentMajorHandle = async (e) => {
    setCurrentMajorInput(e.target.value);
  };

  const setCurrentUnivMajorHandle = () => {
    setCurrentUnivMajor({
      univ: currentUnivInput,
      major: currentMajorInput,
    });
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
      optionList: majorList.length
        ? majorList
        : [{ name: "대학을 선택해 주세요." }],
      onChange: setCurrentMajorHandle,
    },
  ];

  return (
    <div className={styles["item-container"]}>
      <div className={styles["input-container"]}>
        <p className={styles.title}>추천 과목 확인하기</p>
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
    </div>
  );
}
