import { useAtomValue } from 'jotai';
import { NextRouter } from 'next/router';
import BackArrow from 'public/back-arrow.svg';
import { ACCESS_TOKEN, USER_ID } from '~/constants';
import { usersApiService } from '~/service';
import { titleAtom } from '~/store';
import { toast } from '../common';
import styles from './Header.module.scss';

const Header = ({ push, pathname, back }: NextRouter) => {
  const isDetail = pathname.includes('detail');
  const title = useAtomValue(titleAtom);

  if (!title) {
    return null;
  }

  const handleClickLogout = async () => {
    try {
      await usersApiService.postLogout();
      push('/login');
      localStorage.remove(ACCESS_TOKEN);
      localStorage.remove(USER_ID);
    } catch {
      toast.error('에러발생!');
    }
  };

  return (
    <header className={styles.header}>
      {isDetail && <BackArrow onClick={() => back()} />}
      <h1>{title}</h1>
      <button
        type="button"
        className={styles.logout}
        onClick={handleClickLogout}
      >
        logout
      </button>
    </header>
  );
};

export default Header;
