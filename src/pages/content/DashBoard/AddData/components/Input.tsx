import React from "react";
import styles from "./Input.module.css";

interface SelectType {
  title: string;
  optionList: any;
  onChange: () => {};
}

interface InputType {
  title: string;
  value: string;
  placeholder: string;
  require: boolean;
  register: () => {};
}

interface FirstInputType {
  title: string;
  value: string;
  placeholder: string;
  onChange: () => {};
}

export const Select = ({ title, optionList, onChange }: SelectType) => {
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
};

export const Input = ({
  title,
  value,
  placeholder,
  require,
  register,
}: InputType) => {
  return (
    <li className={styles["input-list"]}>
      <p>{title}</p>
      <div className={styles["input-label"]}>
        <label>{title}*</label>
        <input
          type="text"
          name={title}
          placeholder={placeholder}
          {...register(value, { required: require })}
        />
      </div>
    </li>
  );
};

export const FirstInput = ({
  title,
  value,
  placeholder,
  onChange,
}: FirstInputType) => {
  return (
    <li className={styles["input-list"]}>
      <p>{title}</p>
      <div className={styles["input-label"]}>
        <label>{title}*</label>
        <input
          type="text"
          name={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </li>
  );
};
