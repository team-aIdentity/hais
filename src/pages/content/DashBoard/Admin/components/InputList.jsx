import styles from "./InputList.module.css";

export default function InputList({ item }) {
  return (
    <li>
      <p>{item.title}</p>
      <div className={styles["input-label"]}>
        <label>{item.title}*</label>
        <select onChange={(e) => majorOfUnivHandle(e)} required>
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
