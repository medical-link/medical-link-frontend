import type { AppProps } from 'next/app';
import { Layout } from '~/components';
import { Provider } from 'jotai';

import '~/styles/main.scss';
import { Suspense } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={null}>
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </Suspense>
  );
}

export default MyApp;
