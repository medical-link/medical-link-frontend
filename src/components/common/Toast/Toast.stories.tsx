import React from 'react';
import { ComponentMeta } from '@storybook/react';

import Toast, { toast } from './Toast.component';

export default {
  title: 'common/Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>;

export const Template = () => (
  <div>
    <Toast />
    <button type="button" onClick={() => toast.success('에러 발생!')}>
      Success
    </button>
  </div>
);
