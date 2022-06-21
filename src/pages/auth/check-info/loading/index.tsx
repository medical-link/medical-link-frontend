import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Skeleton, Toast, toast } from '~/components';
import { titleAtom } from '~/store';
import styles from './Loading.module.scss';

const LoadingPage = () => {
  const [title, setTitle] = useAtom(titleAtom);
  const router = useRouter();

  useEffect(() => {
    setTitle('의료정보');
    return () => setTitle('');
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (title) {
      const firstId = setTimeout(() => toast.success('의료 기록을 가져왔어요'), 2000);
      const secondId = setTimeout(() => toast.success('현재 투약 중인 약물에 대해 확인했어요'), 5000);
      const thirdId = setTimeout(() => router.push('/report'), 9000);

      return () => {
        toast.removeToastItemAll();
        clearTimeout(firstId);
        clearTimeout(secondId);
        clearTimeout(thirdId);
      };
    }
  }, [title]);

  return (
    <div className={styles.loading}>
      <Toast height={40} delay={10000} />
      <Skeleton />
      <div className={styles.info}>
        <div>ㅇㅇㅇ님의</div>
        <div>의료 데이터를 분석 중이에요</div>
        <div>잠시만 기다려주세요</div>
      </div>
    </div>
  );
};

export default LoadingPage;
