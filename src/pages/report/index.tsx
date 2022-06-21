import { useSetAtom } from 'jotai';
import Head from 'next/head';
import { useEffect } from 'react';
import { titleAtom } from '~/store';

const ReportPage = () => {
  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    setTitle('의료정보');
    return () => setTitle('');
  }, []);

  return (
    <div>
      <Head>
        <title>의료정보</title>
      </Head>
      <div>TEST</div>
    </div>
  );
};

export default ReportPage;
