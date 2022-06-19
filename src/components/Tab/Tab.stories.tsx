import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { useRouter } from 'next/router';
import Tab from './Tab.component';

export default {
  title: 'common/Tab',
  component: Tab,
} as ComponentMeta<typeof Tab>;

export const Template = () => {
  const router = useRouter();
  return <Tab {...router} />;
};
