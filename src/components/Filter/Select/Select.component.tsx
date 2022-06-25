/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import SelectorArrow from 'public/selector-arrow.svg';
import { useFormContext } from 'react-hook-form';
import { CategoryType } from '~/service';
import styles from './Select.module.scss';

interface SelectProps {
  title: string;
  categoryKey: CategoryType;
  categoryList: string[];
}

const Select = ({ title, categoryKey, categoryList }: SelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const { setValue, getValues } = useFormContext();

  const { category, value } = getValues();

  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggleSelect = () => {
    if (!(panelRef.current && contentRef.current)) return;

    panelRef.current.style.height = `${
      isExpanded ? 0 : contentRef.current.offsetHeight
    }px`;

    setIsExpanded(!isExpanded);
  };

  const handleClickFilter = (e: any) => {
    setValue('category', categoryKey);
    setValue('value', e.target.textContent);
    setValue('page', 0);
    handleToggleSelect();
  };

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (!selectRef.current?.contains(target as HTMLDivElement)) {
        if (!(panelRef.current && contentRef.current)) return;

        panelRef.current.style.height = '0px';

        setIsExpanded(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={styles.select} ref={selectRef}>
      <button type="button" onClick={handleToggleSelect}>
        <span>{category === categoryKey && value ? value : title}</span>
        <SelectorArrow
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
        <div ref={contentRef} className={styles.box}>
          {categoryList.map((each) => (
            <div key={each} className={styles.item} onClick={handleClickFilter}>
              {each}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
