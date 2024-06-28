import styles from "./InputList.module.css";

export default function InputList1({ item }) {
  return (
    <li className={styles["input-list"]}>
      <p>{item.title}</p>
      <div className={styles["input-label"]}>
        <label>{item.title}*</label>
        <select onChange={item.onChange}>
          {item.optionList != null && (
            <>
              {item.optionList.map((option, optionIndex) => (
                <option key={optionIndex} value={option.name}>
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
