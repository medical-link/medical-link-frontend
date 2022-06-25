import { useRef, useState } from 'react';
import cn from 'classnames';
import ArrowDown from 'public/arrow-down.svg';
import { MedicalTest } from '~/service';
import styles from './Accordion.module.scss';

const Accordion = ({
  testDate,
  facilityName,
  medicalStatusList,
}: MedicalTest) => {
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
    <div className={styles.accordion}>
      <button type="button" onClick={handleClickButton}>
        <div>
          {testDate && (
            <span>{testDate.split('T')[0].split('-').join('.')}</span>
          )}
          {facilityName && <strong>{facilityName}</strong>}
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
          {medicalStatusList && (
            <table className={styles.table}>
              <tbody>
                {medicalStatusList.map(({ id, testType, value }) => (
                  <tr key={id}>
                    <td>{testType}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
