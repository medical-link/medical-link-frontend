import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Tag, { TagProps } from './Tag.component';

export default {
  title: 'common/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args: TagProps) => <Tag {...args} />;

export const TagActive = Template.bind({});
TagActive.args = {
  text: 'TEST',
};

export const TagOff = Template.bind({});
TagOff.args = {
  text: 'TEST',
  isActive: false,
};
