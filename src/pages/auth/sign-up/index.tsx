import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Input, SelectGender, Spinner, Toast, toast,
} from '~/components';
import { authApiService, PostSignUpRequest, usersApiService } from '~/service';
import { titleAtom, userDataAtom } from '~/store';
import { handleDelay } from '~/utils';
import styles from './SignUp.module.scss';

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useAtom(titleAtom);
  const userData = useAtomValue(userDataAtom);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostSignUpRequest>({
    defaultValues: {
      sex: '남',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await handleDelay(1000);
      await usersApiService.postSignUp(data);
      router.push('/auth/check-info');
      setIsLoading(false);
    } catch {
      setTimeout(() => toast.error('에러가 발생했습니다.'), 500);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    setTitle('회원가입');
    return () => setTitle('');
  }, []);

  useEffect(() => {
    if (userData.userId) {
      router.push('/auth/check-info');
    }
  }, [userData.userId]);

  return (
    <div className={styles['sign-up']}>
      <Toast height={147} />
      <form onSubmit={onSubmit}>
        <div className={styles.container}>
          <Input
            id="name"
            label="이름"
            placeholder="ex) 홍길동"
            errorMessage={errors.name ? '이름을 입력해 주세요' : undefined}
            register={register('name', { required: true })}
          />
          <Input
            type="number"
            id="birth-date"
            label="나이 (출생년도)"
            placeholder="ex) 1990"
            errorMessage={errors.age ? '나이를 입력해 주세요' : undefined}
            register={register('age', { required: true })}
          />
          <SelectGender
            toggleMale={() => setValue('sex', '남')}
            toggleFemale={() => setValue('sex', '여')}
            isMale={watch('sex') === '남'}
          />
          {isLoading && <Spinner />}
        </div>
        <Button
          type="submit"
          labelText="회원가입 하기"
          fullWidth
        />
      </form>
    </div>
  );
};

export default SignUpPage;
