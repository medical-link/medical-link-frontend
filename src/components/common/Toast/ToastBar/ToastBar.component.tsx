import { useEffect, useRef } from 'react';
import Check from 'public/close.svg';
import Error from 'public/error.svg';
import styles from './ToastBar.module.scss';
import { ToastItem } from '../Toast.control';

interface ToastBarProps {
  toastItem: ToastItem;
  onRemoveToastItem: (toastId: string) => void;
  height: number;
  delay: number;
}

const ToastBar = ({
  toastItem,
  onRemoveToastItem,
  height,
  delay,
}: ToastBarProps) => {
  const toastBarElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setOpacity = async (opacity: number, duration: number) => {
      if (toastBarElement.current && toastBarElement.current.style) {
        toastBarElement.current.style.transition = `all ${duration}ms`;

        if (opacity === 0) {
          toastBarElement.current.style.transform = `translate(0%, ${height}px)`;
        } else {
          toastBarElement.current.style.transform = `translate(0%, -${height}px)`;
        }
        toastBarElement.current.style.opacity = `${opacity}`;
      }
    };
    window.requestAnimationFrame(() => setOpacity(1, 500));

    const timeoutForRemove = setTimeout(() => {
      onRemoveToastItem(toastItem.id);
    }, delay);

    const timeoutForOpacity = setTimeout(() => {
      setOpacity(0, 500);
    }, delay - 500);

    return () => {
      clearTimeout(timeoutForRemove);
      clearTimeout(timeoutForOpacity);
    };
  }, [toastItem, onRemoveToastItem, height, delay]);

  return (
    <div
      ref={toastBarElement}
      role={toastItem.role}
      className={styles['toast-bar']}
    >
      <div className={styles.icon}>
        {
          {
            success: <Check onClick={() => onRemoveToastItem(toastItem.id)} />,
            error: <Error onClick={() => onRemoveToastItem(toastItem.id)} />,
          }[toastItem.type]
        }
      </div>
      {toastItem.message}
    </div>
  );
};

export default ToastBar;
