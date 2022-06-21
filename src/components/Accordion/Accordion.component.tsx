import { useRef, useState } from 'react';
import cn from 'classnames';
import ArrowDown from 'public/arrow-down.svg';
import styles from './Accordion.module.scss';
import { Tag } from '../common';

export interface AccordionProps {
  date: string;
  title: string;
  info: {
    [key: string]: string | number;
  };
  illnessList?: string[];
}

const Accordion = ({
  date, title, info, illnessList,
}: AccordionProps) => {
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

  if (!info) {
    return null;
  }

  return (
    <div className={styles.accordion}>
      <button type="button" onClick={handleClickButton}>
        <div>
          {date && <span>{date}</span>}
          {title && <strong>{title}</strong>}
        </div>
        <ArrowDown className={cn({ [styles.expand]: isExpanded })} />
      </button>
      <div
        className={cn(styles.content, { [styles.expand]: isExpanded })}
        ref={panelRef}
      >
        <div ref={contentRef}>
          {info && (
            <table className={styles.table}>
              <tbody>
                {Object.keys(info).map((each) => (
                  <tr key={each}>
                    <td>{each}</td>
                    <td>{info[each]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {illnessList && (
            <div className={styles['tag-container']}>
              {illnessList.map((each) => (
                <Tag key={each} text={each} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
