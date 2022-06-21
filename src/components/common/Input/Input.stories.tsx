import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input, { InputProps } from './Input.component';

export default {
  title: 'common/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: InputProps) => <Input {...args} />;

export const InputNormal = Template.bind({});
InputNormal.args = {
  disabled: false,
  label: 'TEST',
  id: 'test-id',
  required: true,
  placeholder: 'TEST',
};

export const InputWithError = Template.bind({});
InputWithError.args = {
  disabled: false,
  label: 'TEST',
  id: 'test-id',
  required: true,
  errorMessage: 'TEST',
  placeholder: 'TEST',
};
