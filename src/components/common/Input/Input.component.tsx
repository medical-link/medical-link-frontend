import React, {
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
  Ref,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { Label } from '~/components';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
  label?: string;
  id?: string;
  errorMessage?: string;
  initialValue?: string;
  register: UseFormRegisterReturn;
}

export interface ParentRef {
  focus: () => void;
  get: () => string;
  set: ({ value, isValidate }: { value: string; isValidate?: boolean }) => void;
  reset: () => void;
  rawRef: () => React.RefObject<HTMLInputElement>;
}

const Input = (
  {
    children,
    className = '',
    disabled = false,
    label,
    id = '',
    errorMessage = '',
    initialValue,
    register,
    ...restProps
  }: InputProps,
  parentRef: Ref<ParentRef>,
) => {
  const [error, setError] = useState(errorMessage);
  const childRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(parentRef, () => ({
    focus: () => {
      if (childRef.current) childRef.current.focus();
    },
    get: () => childRef.current?.value || '',
    set: ({ value, isValidate = true }) => {
      if (isValidate && childRef.current) {
        childRef.current.value = value;
        setError('');
        return;
      }
      setError('유효하지 않은 값입니다.');
      setTimeout(() => {
        setError('');
      }, 1000);
    },
    reset: () => {
      if (childRef.current) childRef.current.value = '';
    },
    contains: (node: Node) => childRef.current?.contains(node),
    rawRef: () => childRef,
  }));

  useEffect(() => {
    if (initialValue && childRef.current !== null) {
      childRef.current.value = initialValue;
    }
  }, [initialValue]);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  return (
    <div className={cn(styles.input, className)}>
      {label && <Label id={id} label={label} />}
      <div className={styles['input-wrapper']}>
        {children}
        <input
          id={id}
          className={cn({ [styles['error-outline']]: !!error })}
          //   ref={childRef}
          disabled={disabled}
          {...register}
          {...restProps}
        />
      </div>
      <div className={styles.error}>{error}</div>
    </div>
  );
};

export default React.forwardRef<ParentRef, InputProps>(Input);
