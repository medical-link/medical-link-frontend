import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { Header, Tab } from '~/components';
import { ACCESS_TOKEN, USER_ID } from '~/constants';
import { authApiService, usersApiService } from '~/service';
import { userDataAtom } from '~/store';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [userData, setUserData] = useAtom(userDataAtom);

  useEffect(() => {
    (async () => {
      const isTokenExist = localStorage.getItem(ACCESS_TOKEN);
      const isUserIdExist = localStorage.getItem(USER_ID);

      if (isTokenExist && isUserIdExist && !userData.userId) {
        try {
          await authApiService.postAuthVerify();
          const data = await usersApiService.getUserData();
          await setUserData(data);
        } catch {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(ACCESS_TOKEN);
          router.push('/login');
        }
      }
    })();
  }, [router.pathname, userData.userId]);

  return (
    <main className={styles.layout}>
      <section className={styles.landing}>
        <Image src="/landing.png" width="430" height="500" alt="landing" />
      </section>
      <section className={styles.app}>
        <Header {...router} />
        {children}
        <Tab {...router} />
      </section>
    </main>
  );
};

export default Layout;
