import { areaType, schoolType, schoolYear } from "./SchoolInputList";
import { useForm } from "react-hook-form";
import styles from "./SchoolInput.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../../components/context/UserContext";
import useSetChildDoc from "../../../../../hooks/useSetChildDoc";
import useGetChildDoc from "../../../../../hooks/useGetChildDoc";

export default function SchoolInput() {
  const { register, handleSubmit } = useForm();
  const [inputSchoolYear, setInputSchoolYear] = useState();
  const [defaultValue, setDefaultValue] = useState("");
  const ctx = useContext(UserContext);
  const { userData } = ctx;

  const value = {
    title: "학교",
    items: [
      {
        title: "학교 이름",
        name: "schoolName",
        inputType: 0,
        defaultValue: defaultValue.schoolName,
      },
      {
        title: "학교 유형",
        name: "schoolType",
        inputType: 1,
        optionList: schoolType,
      },
      {
        title: "관할 지역",
        name: "schoolArea",
        inputType: 1,
        optionList: areaType,
      },
    ],
  };

  const setSchoolDataHandle = async (data) => {
    if (data == userData.school) return;

    try {
      await useSetChildDoc(
        "users",
        userData.id,
        "school",
        inputSchoolYear,
        data
      );
      alert("입력을 완료했습니다.");
    } catch (e) {
      console.log("School Input >>>>> " + e);
    }
  };

  const getDefaultValueHandle = async (selectedYear) => {
    const schoolData = await useGetChildDoc(
      "users",
      userData.id,
      "school",
      selectedYear
    );

    if (schoolData != undefined) {
      setDefaultValue(schoolData);
    }
  };

  const selectSchoolYearHandle = async (e) => {
    const selectedYear = e.target.value;
    setInputSchoolYear(selectedYear);
    await getDefaultValueHandle(selectedYear);
  };

  useEffect(() => {
    getDefaultValueHandle(schoolYear[0]);
  }, []);

  return (
    <form
      className={styles["item-container"]}
      onSubmit={handleSubmit((data) => setSchoolDataHandle(data))}
    >
      <div className={styles["input-container"]}>
        <p className={styles.title}>{value.title}</p>
        <select
          className={styles["school-year"]}
          onChange={(e) => selectSchoolYearHandle(e)}
          value={inputSchoolYear}
          required
        >
          {schoolYear.map((option, optionIndex) => (
            <option key={optionIndex} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ul>
          {value.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <p>{item.title}</p>
              <div className={styles["input-label"]}>
                <label>{item.title}*</label>
                {item.inputType === 0 && (
                  <input
                    type="text"
                    name={item.title}
                    defaultValue={item.defaultValue}
                    placeholder="빈칸을 입력해 주세요"
                    {...register(item.name, { required: true })}
                  />
                )}
                {item.inputType === 1 && (
                  <select
                    // defaultValue={item.defaultValue}
                    {...register(item.name, { required: true })}
                    required
                  >
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
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles["button-container"]}>
        <button type="submit">저장하기</button>
      </div>
    </form>
  );
}
