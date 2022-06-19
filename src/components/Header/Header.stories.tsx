import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from './Header.component';

export default {
  title: 'common/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

export const Template: ComponentStory<typeof Header> = () => <Header />;
