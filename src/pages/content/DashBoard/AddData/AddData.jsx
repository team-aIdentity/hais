import InputContainer from "./components/InputContainer";
import { getInputList } from "./hooks/hooks";
import styles from "./AddData.module.css";

export default function AddData() {
  const inputList = getInputList();
  return (
    <div className={styles["add-data"]}>
      {inputList.map((data, index) => (
        <div className={styles["input-container"]} key={index}>
          <div className={styles["input-box"]}>
            <p className={styles.title}>{data.title}</p>
            <InputContainer
              value={data.value}
              list={data.list}
              onSubmit={data.onSubmit}
              firstInput={data.firstInput}
            />
          </div>
          <div className={styles["default-list"]}>
            {data.defaultList && (
              <ul>
                {data.defaultList.map((data, index) => (
                  <li key={index}>{data.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
