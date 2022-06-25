import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Input,
  SelectGender,
  Spinner,
  SpinnerView,
  Toast,
  toast,
} from '~/components';
import { PostSignUpRequest, usersApiService } from '~/service';
import { titleAtom, userDataAtom } from '~/store';
import { handleDelay } from '~/utils';
import styles from './SignUp.module.scss';

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setTitle = useSetAtom(titleAtom);
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

  watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await handleDelay(1000);
      await usersApiService.postSignUp(data);
      router.push('/auth/check-info');
    } catch {
      setTimeout(() => toast.error('에러가 발생했습니다.'), 500);
    } finally {
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
    <>
      {isLoading && <SpinnerView />}
      <div className={styles['sign-up']}>
        <Toast height={147} />
        <form onSubmit={onSubmit}>
          <div className={styles.container}>
            <Input
              id="name"
              label="이름"
              placeholder="ex) 홍길동"
              errorMessage={
                errors.name
                && (errors?.name.type === 'required'
                  ? errors?.name.message
                  : '이름은 한글/영문으로 입력해 주세요')
              }
              register={register('name', {
                required: '이름을 입력해 주세요',
                pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/,
              })}
            />
            <Input
              type="number"
              id="birth-date"
              label="나이"
              placeholder="ex) 29"
              errorMessage={
                errors.age
                && (errors?.age.type === 'required'
                  ? errors?.age.message
                  : '나이를 정확하게 입력해주세요.')
              }
              register={register('age', {
                required: '나이를 입력해 주세요',
                min: 14,
                max: 150,
              })}
            />
            <SelectGender
              toggleMale={() => setValue('sex', '남')}
              toggleFemale={() => setValue('sex', '여')}
              isMale={watch('sex') === '남'}
            />
          </div>
          <Button type="submit" labelText="회원가입 하기" />
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
