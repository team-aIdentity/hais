import React from "react";
import styles from "./Input.module.css";

interface SelectType {
  title: string;
  optionList: any;
  onChange: () => {};
}

export default function Select({ title, optionList, onChange }: SelectType) {
  return (
    <li className={styles["input-list"]}>
      <p>{title}</p>
      <div className={styles["input-label"]}>
        <label>{title}*</label>
        <select onChange={onChange} defaultValue="DEFAULT" required>
          {optionList != null && (
            <>
              <option value="DEFAULT" disabled>
                선택해 주세요
              </option>
              {optionList.map((option, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  {option.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
    </li>
  );
}
