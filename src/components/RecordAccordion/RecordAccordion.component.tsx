import { useRef, useState } from 'react';
import cn from 'classnames';
import ArrowDown from 'public/arrow-down.svg';
import { MedicalRecord } from '~/service';
import styles from './RecordAccordion.module.scss';

const RecordAccordion = ({
  recordDate,
  diagnosisType,
  facilityName,
  medicineInfoList,
}: MedicalRecord) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickButton = () => {
    if (!(panelRef.current && contentRef.current)) return;

    panelRef.current.style.height = `${
      isExpanded ? 0 : contentRef.current.offsetHeight
    }px`;

    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles['record-accordion']}>
      <button type="button" onClick={handleClickButton}>
        <div>
          {recordDate && (
            <span>{recordDate.split('T')[0].split('-').join('.')}</span>
          )}
          {diagnosisType && <strong>{diagnosisType}</strong>}
        </div>
        <ArrowDown
          className={cn({
            [styles.expand]: isExpanded,
            [styles.close]: !isExpanded,
          })}
        />
      </button>
      <div
        className={cn(styles.content, { [styles.expand]: isExpanded })}
        ref={panelRef}
      >
        <div ref={contentRef}>
          <div className={styles.title}>병원정보</div>
          <div>{facilityName}</div>
          <div className={styles.title}>처방조제</div>
          <ul>
            {medicineInfoList?.map(({ id, medicineType, name }) => (
              <li key={id}>
                <span className={styles.strong}>{medicineType}</span>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecordAccordion;
