import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Tab } from '~/components';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <>
      {children}
      <Tab {...router} />
    </>
  );
};

export default Layout;
