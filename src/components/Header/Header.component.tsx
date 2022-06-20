import { useAtomValue } from 'jotai';
import { NextRouter } from 'next/router';
import BackArrow from 'public/back-arrow.svg';
import { titleAtom } from '~/store';
import styles from './Header.module.scss';

const Header = ({ push, pathname }: NextRouter) => {
  const isDetail = pathname.includes('detail');
  const title = useAtomValue(titleAtom);

  if (!title) {
    return null;
  }

  return (
    <header className={styles.header}>
      {isDetail && <BackArrow onClick={() => push('/report')} />}
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
