/* eslint-disable no-cond-assign */
import { Button, toast, Toast } from '~/components';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { authApiService, usersApiService } from '~/service';
import { ACCESS_TOKEN, USER_ID } from '~/constants';
import Link from 'next/link';
import styles from './Login.module.scss';

const parseCallBack = (url: string) => {
  const params: { [key: string]: string } = {};
  const queryString = url.substring(1);
  const regex = /([^#?&=]+)=([^&]*)/g;
  let match;
  while ((match = regex.exec(queryString)) !== null) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }

  return params;
};

const LoginPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async (authCode: string) => {
      try {
        const { accessToken } = await authApiService.postLogin({ authCode });
        localStorage.setItem(ACCESS_TOKEN, accessToken);

        const { userId } = await usersApiService.getUserId();
        localStorage.setItem(USER_ID, userId);
        router.push('/auth/sign-up');
      } catch {
        toast.error('서버 오류가 발생했습니다.');
      }
    };

    const { code } = parseCallBack(router.asPath) as { code?: string };

    if (code) {
      handleLogin(code);
    }
  }, []);

  return (
    <div>
      <Toast height={150} />
      <div className={styles.auth}>
        <h2 className={styles.content}>
          <div>마이 데이터로</div>
          <div>의료 데이터 분석과</div>
          <div>임상시험 추천까지 빠르게!</div>
        </h2>
        <img src="/welcome.png" alt="welcome" />
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=d45843830a8fd527b90f3b52e18520bc&redirect_uri=${process.env.CURRENT_URL}%2flogin&response_type=code`}
          passHref
        >
          <Button isKakao fullWidth />
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
