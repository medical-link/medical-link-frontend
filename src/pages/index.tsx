import type { NextPage } from 'next';
import Head from 'next/head';
import { Button } from '~/components';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Medical Link</title>
      <meta name="description" content="Test" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Button>Main</Button>
    </main>

    <footer>Footer</footer>
  </div>
);

export default Home;
