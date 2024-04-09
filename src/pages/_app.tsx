import '@src/styles/globals.css'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Spin } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@src/components/layout/default-layout';

function defaultLayout(page: any) {
  return <DefaultLayout>{page}</DefaultLayout>;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const getLayout:any = defaultLayout;

  const loadingRef:any = useRef(undefined);

  useEffect(() => {
      const start = () => {
          if (loadingRef.current) {
              clearTimeout(loadingRef.current);
          }
          loadingRef.current = setTimeout(() => {
              setLoading(true);
          }, 200);
      };
      const end = () => {
          if (loadingRef.current) {
              clearTimeout(loadingRef.current);
          }
          setLoading(false);
      };
      router.events.on('routeChangeStart', start);
      router.events.on('routeChangeComplete', end);
      router.events.on('routeChangeError', end);
      window.addEventListener('showLoading', start);
      window.addEventListener('hideLoading', end);
      return () => {
          router.events.off('routeChangeStart', start);
          router.events.off('routeChangeComplete', end);
          router.events.off('routeChangeError', end);
          window.removeEventListener('showLoading', start);
          window.removeEventListener('hideLoading', end);
      };
  }, []);

  return (
    <Spin spinning={loading}>
    <ToastContainer />
    {getLayout(<Component {...pageProps} />)}
</Spin>
  )
}
