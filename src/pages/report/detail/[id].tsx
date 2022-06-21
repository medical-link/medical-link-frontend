import { useSetAtom } from 'jotai';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { titleAtom } from '~/store';

const ReportDetailPage = () => {
  const { query } = useRouter();

  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    setTitle('의료정보');
  }, []);

  return (
    <>
      <Head>
        <title>의료정보</title>
      </Head>
      <div>TEST</div>
    </>
  );
};

// export const getStaticPaths = async () => ({
//   paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//   fallback: false,
// });

// export const getStaticProps = async (context) => {
//   console.log(context);

//   return {
//     props: { id: 1 },
//   };
// };

export default ReportDetailPage;
