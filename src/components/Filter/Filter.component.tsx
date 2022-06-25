import Checked from 'public/checked.svg';
import Unchecked from 'public/unchecked.svg';
import { useFormContext } from 'react-hook-form';
import styles from './Filter.module.scss';
import Select from './Select/Select.component';

const ILLNESS = [
  '폐암',
  '위암',
  '대장암',
  '췌장암',
  '전립선암',
  '고혈압',
  '유방암',
];
const LOCATION = [
  '서울',
  '경기',
  '경상',
  '전라',
  '충청',
  '대전',
  '대구',
  '부산',
  '울산',
];
const FACILITY = [
  '삼성병원',
  '세브란스',
  '고려대',
  '경희대',
  '서울대',
  '가톨릭대',
];

const Filter = () => {
  const { setValue, getValues } = useFormContext();

  const { category } = getValues();

  const isCheckedPersonal = category === 'personal';

  const Icon = isCheckedPersonal ? Checked : Unchecked;

  return (
    <div className={styles.filter}>
      <div className={styles.container}>
        <Icon
          onClick={() => {
            setValue('category', isCheckedPersonal ? '' : 'personal');
            setValue('value', '');
            setValue('page', 0);
          }}
        />
        <span>개인화 적용</span>
      </div>
      <div className={styles['select-area']}>
        <Select title="병원" categoryKey="facility" categoryList={FACILITY} />
        <Select title="질병" categoryKey="illness" categoryList={ILLNESS} />
        <Select title="지역" categoryKey="location" categoryList={LOCATION} />
      </div>
    </div>
  );
};

export default Filter;
