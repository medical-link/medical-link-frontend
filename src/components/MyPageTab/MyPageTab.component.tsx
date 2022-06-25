import cn from 'classnames';
import { useRouter } from 'next/router';
import styles from './MyPageTab.module.scss';

const MyPageTab = () => {
  const { pathname, push } = useRouter();
  if (pathname && !pathname.includes('my-info')) {
    return null;
  }

  const isRecord = pathname.includes('record');

  return (
    <div className={styles['my-page-tab']}>
      <button type="button" className={cn({ [styles.active]: isRecord })} onClick={() => push('/my-info/record')}>
        진료기록
      </button>
      <button type="button" className={cn({ [styles.active]: !isRecord })} onClick={() => push('/my-info/health-check')}>
        건강검진
      </button>
    </div>
  );
};

export default MyPageTab;
