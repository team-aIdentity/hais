import { areaType, schoolType } from "./UserHighInputList";
import { useForm } from "react-hook-form";
import styles from "./UserHighInput.module.css";
import { useContext } from "react";
import UserContext from "../../../../../components/context/UserContext";
// import setUpdateDoc from "../../../../../hooks/useUpdateDoc";
import useSetChildDoc from "../../../../../hooks/useSetChildDoc";

export default function SchoolInput() {
  const { register, handleSubmit } = useForm();
  const ctx = useContext(UserContext);

  const { userData, setUpUserData } = ctx;

  const value = {
    title: "학교",
    items: [
      {
        title: "학교 이름",
        name: "schoolName",
        inputType: 0,
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
      console.log(userData.id);
      await useSetChildDoc("users", userData.id, "school", "1-2", data);
    } catch (e) {
      console.log("School Input >>>>> " + e);
    }
    // try {
    //   let newUserData = {
    //     ...userData,
    //     // school: data, //
    //   };
    //   await setUpdateDoc("users", userData.email, newUserData);
    //   await setUpUserData();

    //   await console.log("Upload SchoolInput Data");
    // } catch (e) {
    //   console.log("SchoolInput >>>>> " + e);
    // }
  };

  return (
    <form
      className={styles["item-container"]}
      onSubmit={handleSubmit((data) => setSchoolDataHandle(data))}
    >
      <div className={styles["input-container"]}>
        <p className={styles.title}>{value.title}</p>
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
                    placeholder="빈칸을 입력해 주세요"
                    {...register(item.name, { required: true })}
                  />
                )}
                {item.inputType === 1 && (
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
