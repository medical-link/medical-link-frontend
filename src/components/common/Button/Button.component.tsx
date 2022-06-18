import React, {
  ButtonHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import cn from 'classnames';
import Kakao from 'public/kakao.svg';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  labelText?: string;
  isKakao?: boolean;
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
    isKakao = false,
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
      className={cn(className, styles.button, {
        [styles['full-width']]: fullWidth,
        [styles.kakao]: isKakao,
      })}
      disabled={disabled}
      {...restProps}
    >
      {isKakao && (
        <>
          <span className={styles.icon}>
            <Kakao />
          </span>
          카카오로 시작하기
        </>
      )}
      <span>{labelText ? <>{labelText}</> : children}</span>
    </button>
  );
};

export default forwardRef<ParentRef, ButtonProps>(Button);
