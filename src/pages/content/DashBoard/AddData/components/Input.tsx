import React from "react";
import styles from "./Input.module.css";

interface InputType {
  title: string;
  value: string;
  placeholder: string;
  require: boolean;
  register: () => {};
}

export default function Input({
  title,
  value,
  placeholder,
  require,
  register,
}: InputType) {
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
}
