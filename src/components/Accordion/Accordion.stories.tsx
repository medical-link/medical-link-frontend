import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Accordion, { AccordionProps } from './Accordion.component';

export default {
  title: 'common/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const MEDICINE_DATA = {
  date: '2022.06.12',
  title: '서울보라매병원',
  info: {
    병원정보: '손이비인후과의원 (서대문구 수색로)',
    방문일수: 1,
    처방일수: 0,
    투약일수: 1,

  },
  illnessList: ['대장암3기', '당뇨', '저혈압'],
};

const HOSPITAL_DATA = {
  date: '2022.06.12',
  title: '서울보라매병원',
  info: {
    혈구수치: '정상(80)',
    공복혈당: '비정상(150)',
    CT검사: '대장외막종양의심',
    흉부검사: '정상',
    신장: '170',
    체중: '80',
    혈압: '저혈압(60)',
    처방정보: '서울대암병원 / 젤로다',
  },
  illnessList: ['대장암3기', '당뇨', '저혈압'],
};

const Template: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args} />
);

export const 투약정보 = Template.bind({});
투약정보.args = {
  ...MEDICINE_DATA,
};

export const 건강검진 = Template.bind({});
건강검진.args = {
  ...HOSPITAL_DATA,
};
