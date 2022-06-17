import { useCallback, useEffect, useState } from 'react';
import Portal from '../Portal/Portal.component';
import Toaster, { ToastItem } from './Toast.control';
import ToastBar from './ToastBar/ToastBar.component';
import styles from './Toast.module.scss';

// eslint-disable-next-line import/no-mutable-exports
export let toast: Toaster = new Toaster(null);

const Toast = () => {
  const [toastItems, setToastItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    /** Initialize */
    toast = new Toaster(setToastItems);
  }, []);

  const removeToastItem = useCallback((toastId: ToastItem['id']) => {
    toast.removeToastItem(toastId);
  }, []);

  return (
    <Portal>
      <div className={styles.toast}>
        {toastItems.map((toastItem) => (
          <ToastBar
            toastItem={toastItem}
            onRemoveToastItem={removeToastItem}
            key={toastItem.id}
          />
        ))}
      </div>
    </Portal>
  );
};

export default Toast;
