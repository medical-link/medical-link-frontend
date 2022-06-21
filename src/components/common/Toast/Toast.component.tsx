import { useCallback, useEffect, useState } from 'react';
import Portal from '../Portal/Portal.component';
import Toaster, { ToastItem } from './Toast.control';
import ToastBar from './ToastBar/ToastBar.component';
import styles from './Toast.module.scss';

// eslint-disable-next-line import/no-mutable-exports
export let toast: Toaster = new Toaster(null);

export interface ToastProps {
  height?: number;
  delay?: number;
}

const Toast = ({ height = 70, delay = 4000 }: ToastProps) => {
  const [toastItems, setToastItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    /** Initialize */
    toast = new Toaster(setToastItems);
  }, []);

  const removeToastItem = useCallback((toastId: ToastItem['id']) => {
    toast.removeToastItem(toastId);
  }, []);

  return (
    <div className={styles.toast}>
      {toastItems.map((toastItem) => (
        <ToastBar
          toastItem={toastItem}
          onRemoveToastItem={removeToastItem}
          key={toastItem.id}
          height={height}
          delay={delay}
        />
      ))}
    </div>
  );
};

export default Toast;
