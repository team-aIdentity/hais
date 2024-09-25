import React from "react";

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
                {data.defaultList.map((_data, index) => (
                  <li key={index} className={styles["default-list-li"]}>
                    <p>{_data.name}</p>
                    <button onClick={() => data.deleteHandle(_data)}>X</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
