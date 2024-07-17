import styles from "./InputList.module.css";

export default function InputList2({ item }) {
  return (
    <li className={styles["input-list"]}>
      <p>{item.title}</p>
      <div className={styles["input-label"]}>
        <label>{item.title}*</label>
        <select
          {...item.register(item.name, { required: true })}
          defaultValue="DEFAULT"
          required
        >
          {item.optionList != null && (
            <>
              <option value="DEFAULT" disabled>
                선택해 주세요
              </option>
              {item.optionList.map((option, optionIndex) => (
                <option key={optionIndex} value={option.value}>
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
