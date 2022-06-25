import { Suspense, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'jotai';
import { Layout, TopButton } from '~/components';

import '~/styles/main.scss';
import { setVhForMobile } from '~/utils';
import { useDebounce } from '~/hooks';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const handleThrottleSetVhForMobile = useDebounce(() => {
    setVhForMobile();
  }, 200);

  useEffect(() => {
    setVhForMobile();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleThrottleSetVhForMobile);

    return () => {
      window.removeEventListener('resize', handleThrottleSetVhForMobile);
    };
  }, [handleThrottleSetVhForMobile]);

  const [scrollY, setScrollY] = useState(0);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > window.innerHeight) {
      setIsBtnVisible(true);
      return;
    }
    setIsBtnVisible(false);
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
    setIsBtnVisible(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  return (
    <Suspense fallback={null}>
      <Provider>
        <Layout>
          <Component {...pageProps} />
          {!pathname.includes('auth') && (
            <TopButton onClick={handleTop} isBtnVisible={isBtnVisible} />
          )}
        </Layout>
      </Provider>
    </Suspense>
  );
}

export default MyApp;
