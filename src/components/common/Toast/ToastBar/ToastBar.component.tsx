import { useEffect, useRef } from 'react';
import Close from 'public/close.svg';
import styles from './ToastBar.module.scss';
import { ToastItem } from '../Toast.control';

interface ToastBarProps {
  toastItem: ToastItem;
  onRemoveToastItem: (toastId: string) => void;
}

const ToastBar = ({ toastItem, onRemoveToastItem }: ToastBarProps) => {
  const toastBarElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setOpacity = (opacity: number, duration: number) => {
      if (toastBarElement.current) {
        toastBarElement.current.style.transition = `all ${duration}ms`;
        toastBarElement.current.style.opacity = `${opacity}`;
        if (opacity === 0) {
          toastBarElement.current.style.transform = 'translate(0%, 20px)';
          return;
        }
        toastBarElement.current.style.transform = 'translate(0%, -20px)';
      }
    };

    setTimeout(() => setOpacity(1, 500), 0);

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
