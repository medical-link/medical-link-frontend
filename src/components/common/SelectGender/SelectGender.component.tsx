import cn from 'classnames';
import Label from '../Label/Label.component';
import styles from './SelectGender.module.scss';

interface SelectGenderProps {
  toggleMale: () => void;
  toggleFemale: () => void;
  isMale: boolean;
}

const SelectGender = ({ toggleMale, toggleFemale, isMale }: SelectGenderProps) => {
  const abc = 0;

  return (
    <div className={styles['select-gender']}>
      <Label label="성별" />
      <div className={styles.container}>
        <button
          type="button"
          className={cn(styles.male, { [styles.select]: isMale })}
          onClick={toggleMale}
        >
          남
        </button>
        <button
          type="button"
          className={cn(styles.female, { [styles.select]: !isMale })}
          onClick={toggleFemale}
        >
          여
        </button>
      </div>
    </div>
  );
};

export default SelectGender;
