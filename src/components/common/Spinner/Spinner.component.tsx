import React from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  isActive?: boolean;
}
const Spinner = (
  { isActive = true }: SpinnerProps,
  parentRef?: React.LegacyRef<HTMLDivElement> | undefined,
) => {
  if (!isActive) return null;

  return (
    <div
      className={styles.loading}
      ref={parentRef}
    >
      <div className={styles.spinner}>
        <div className={styles['double-bounce1']} />
        <div className={styles['double-bounce2']} />
      </div>
    </div>
  );
};

export default React.forwardRef(Spinner);
