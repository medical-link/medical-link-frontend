import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Banner from './Banner.component';

export default {
  title: 'common/Banner',
  component: Banner,
} as ComponentMeta<typeof Banner>;

export const Template: ComponentStory<typeof Banner> = () => <Banner />;
