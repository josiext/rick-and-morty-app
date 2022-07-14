import styles from "./RadioButton.module.css";

export interface RadioButtonProps {
  value: string;
  checked: boolean;
  onClick: (value: string) => void;
}

const RadioButton = ({ value, checked, onClick }: RadioButtonProps) => {
  return (
    <label className={styles.label}>
      {value}
      <input
        className={styles.input}
        type="radio"
        onChange={() => onClick(value)}
        checked={checked}
      />
    </label>
  );
};

export default RadioButton;
