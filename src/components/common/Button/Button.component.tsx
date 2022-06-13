import React, {
  ButtonHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  labelText?: string;
}

export interface ParentRef {
  focus: () => void;
}

const Button = (
  {
    children,
    className = '',
    disabled = false,
    fullWidth = false,
    labelText = '',
    ...restProps
  }: ButtonProps,
  parentRef: React.Ref<ParentRef>,
) => {
  const childRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(parentRef, () => ({
    focus: () => {
      childRef.current?.focus();
    },
  }));

  return (
    <button
      type="button"
      ref={childRef}
      className={cn(className, styles.button, { [styles['full-width']]: fullWidth })}
      disabled={disabled}
      {...restProps}
    >
      <span>{labelText ? <>{labelText}</> : children}</span>
    </button>
  );
};

export default forwardRef<ParentRef, ButtonProps>(Button);
