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

export const ButtonBasic = Template.bind({});
ButtonBasic.args = {
  labelText: 'TEST',
};

export const ButtonDisabled = Template.bind({});
ButtonDisabled.args = {
  disabled: true,
  labelText: 'TEST',
};

export const ButtonFullWidth = Template.bind({});
ButtonFullWidth.args = {
  fullWidth: true,
  labelText: 'TEST',
};
