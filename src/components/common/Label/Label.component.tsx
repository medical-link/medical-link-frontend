import React, { LabelHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Label.module.scss';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  label?: string;
  id?: string;
}

const Label = ({
  className = '', label, id = '',
}: LabelProps) => (
  <label className={cn(styles.label, className)} htmlFor={id}>
    <span>{label}</span>
  </label>
);

export default Label;
