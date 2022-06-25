import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Skeleton, Toast, toast } from '~/components';
import { usersApiService } from '~/service';
import { titleAtom, userDataAtom } from '~/store';
import { handleDelay } from '~/utils';
import styles from './Loading.module.scss';

const LoadingPage = () => {
  const [title, setTitle] = useAtom(titleAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  useEffect(() => {
    setTitle('의료정보');
    return () => setTitle('');
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (title) {
      (async () => {
        await handleDelay(2000);
        toast.success('의료 기록을 가져왔어요');
        await handleDelay(2000);
        toast.success('현재 투약 중인 약물에 대해 확인했어요');

        try {
          await usersApiService.postMyData();
          const data = await usersApiService.getUserData();

          setUserData(data);
          await handleDelay(2000);

          router.push('/report');
        } catch {
          toast.error('본인 인증에 실패했어요');
        }

        return () => {
          toast.removeToastItemAll();
        };
      })();
    }
  }, [title]);

  return (
    <div className={styles.loading}>
      <Toast height={40} delay={7000} />
      <Skeleton />
      <div className={styles.info}>
        <div>
          {userData.name}
          님의
        </div>
        <div>의료 데이터를 분석 중이에요</div>
        <div>잠시만 기다려주세요</div>
      </div>
    </div>
  );
};

export default LoadingPage;
