import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Banner, Button, NoData } from '~/components';
import { titleAtom } from '~/store';
import styles from './CheckInfo.module.scss';

const CheckInfoPage = () => {
  const setTitle = useSetAtom(titleAtom);
  const router = useRouter();

  useEffect(() => {
    setTitle('의료정보');
    return () => setTitle('');
  }, []);

  return (
    <div className={styles['check-info']}>
      <div className={styles.container}>
        <Banner />
        <NoData text="생성된 의료 정보가 없어요!" />
        <div className={styles.info}>
          <div>본인인증 만으로</div>
          <div>간편하게 빠르게</div>
          <div>임상시험을 조회해 보세요!</div>
        </div>
      </div>
      <Button
        type="submit"
        labelText="본인 인증하고 조회하기"
        onClick={() => router.push('/auth/check-info/loading')}
      />
    </div>
  );
};

export default CheckInfoPage;
