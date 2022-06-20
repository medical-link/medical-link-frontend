import React, { useEffect } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NextRouter, useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { titleAtom } from '~/store';
import Header from './Header.component';

export default {
  title: 'common/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args: NextRouter) => {
  const router = useRouter();
  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    setTitle('TEST');
  });

  return <Header {...router} {...args} />;
};

export const HeaderWithBackButton = Template.bind({});
HeaderWithBackButton.args = {
  pathname: 'detail',
};

export const HeaderWithoutBackButton = Template.bind({});
