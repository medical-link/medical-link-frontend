import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Close from 'public/close.svg';
import styles from './ToastBar.module.scss';
import { ToastItem } from '../Toast.control';

interface ToastBarProps {
  toastItem: ToastItem;
  onRemoveToastItem: (toastId: string) => void;
}

const ToastBar = ({ toastItem, onRemoveToastItem }: ToastBarProps) => {
  const toastBarElement = useRef<HTMLDivElement>(null);

  const setOpacity = (opacity: number, duration: number) => {
    if (toastBarElement.current) {
      toastBarElement.current.style.transition = `${duration}ms`;
      toastBarElement.current.style.opacity = `${opacity}`;
      toastBarElement.current.style.transform = 'translate(0%, -15px)';
    }
  };

  useEffect(() => {
    setOpacity(1, 500);

    const timeoutForRemove = setTimeout(() => {
      onRemoveToastItem(toastItem.id);
    }, 4000);

    const timeoutForOpacity = setTimeout(() => {
      setOpacity(0, 500);
    }, 3500);

    return () => {
      clearTimeout(timeoutForRemove);
      clearTimeout(timeoutForOpacity);
    };
  }, [toastItem, onRemoveToastItem]);

  return (
    <div
      ref={toastBarElement}
      role={toastItem.role}
      className={styles['toast-bar']}
    >
      <div className={styles.icon}>
        <Close onClick={() => onRemoveToastItem(toastItem.id)} />
      </div>
      {toastItem.message}
    </div>
  );
};

export default ToastBar;
