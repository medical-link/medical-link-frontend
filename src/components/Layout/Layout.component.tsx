import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Header, Tab } from '~/components';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <section className={styles.landing}>
        Landing Area
      </section>
      <section className={styles.app}>
        <Header {...router} />
        {children}
        <Tab {...router} />
      </section>
    </div>
  );
};

export default Layout;
