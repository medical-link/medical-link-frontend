import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/my-info/record');
  }, [router]);

  return null;
};

export default HomePage;
