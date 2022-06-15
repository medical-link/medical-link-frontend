import React, { AriaRole, SetStateAction } from 'react';
import { uuid } from '~/utils';

export type ToastType = 'success' | 'error';

export type ToastRole = Extract<AriaRole, 'alert' | 'status'>;

export interface ToastItem {
    id: string;
    type: ToastType;
    message: string;
    role: ToastRole;
  }

type SetToastItems = React.Dispatch<SetStateAction<ToastItem[]>>;

export type ToastPosition = 'top' | 'bottom';

class Toaster {
  // eslint-disable-next-line class-methods-use-this
  setToastItems: SetToastItems = () => null;

  constructor(setState: SetToastItems | null) {
    if (setState) this.setToastItems = setState;
  }

  addToastItem({ type, message, role }: Omit<ToastItem, 'id'>): void {
    this.setToastItems((state: ToastItem[]) => [
      {
        id: uuid(),
        type,
        message,
        role,
      },
      ...state,
    ]);
  }

  removeToastItem(toastId: ToastItem['id']): void {
    this.setToastItems((state: ToastItem[]) => state.filter(({ id }) => id !== toastId));
  }

  success(message: ToastItem['message'], role: ToastRole = 'status'): void {
    this.addToastItem({ type: 'success', message, role });
  }

  info(message: ToastItem['message'], role: ToastRole = 'status'): void {
    this.addToastItem({ type: 'error', message, role });
  }
}

export default Toaster;
