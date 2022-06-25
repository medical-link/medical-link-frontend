import { ButtonHTMLAttributes, useEffect, useRef } from 'react';
import Top from 'public/top.svg';
import styles from './TopButton.module.scss';

interface TopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isBtnVisible: boolean;
}

const TopButton = ({ isBtnVisible, ...restProps }: TopButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      if (isBtnVisible) {
        buttonRef.current.style.transform = 'translateY(-50px)';
        buttonRef.current.style.transition = 'all 1000ms';
        return;
      }
      buttonRef.current.style.transform = 'translateY(100px)';
    }
  }, [isBtnVisible]);

  return (
    <div className={styles['top-button']}>
      <button
        ref={buttonRef}
        type="button"
        {...restProps}
      >
        <Top />
      </button>
    </div>
  );
};

export default TopButton;
