import { useEffect } from 'react';
import Layout from '../components/layouts/main';
import Fonts from '../components/fonts';
import { AnimatePresence } from 'framer-motion';
import Chakra from '../components/chakra';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/doc-viewer.css';
import '@cyntler/react-doc-viewer/dist/index.css';

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

function Website({ Component, pageProps, router }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(
        (registration) => console.log('Service Worker registered:', registration),
        (error) => console.error('Service Worker registration failed:', error)
      );
    }
  }, []);

  return (
    <Chakra cookies={pageProps.cookies}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence
          mode="wait"
          initial={true}
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0 });
            }
          }}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
        <Analytics />
        <SpeedInsights />
      </Layout>
    </Chakra>
  );
}

export default Website;