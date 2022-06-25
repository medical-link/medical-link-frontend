import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MedicalTest } from '~/service';
import Accordion from './Accordion.component';

export default {
  title: 'common/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

export const Template: ComponentStory<typeof Accordion> = (args: MedicalTest) => (
  <Accordion {...args} />
);
