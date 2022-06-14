import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button, { ButtonProps } from './Button.component';

export default {
  title: 'common/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <Button {...args} />
);

export const ButtonNormal = Template.bind({});
ButtonNormal.args = {
  fullWidth: true,
  labelText: 'TEST',
};

export const ButtonKakao = Template.bind({});
ButtonKakao.args = {
  isKakao: true,
  fullWidth: true,
};

export const ButtonDisabled = Template.bind({});
ButtonDisabled.args = {
  disabled: true,
  fullWidth: true,
  labelText: 'TEST',
};
