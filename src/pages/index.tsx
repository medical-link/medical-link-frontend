import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <Head>
      <title>Medical Link</title>
      <meta name="description" content="Test" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HomePage;
