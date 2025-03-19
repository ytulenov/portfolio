import { useEffect } from 'react';
import Layout from '../components/layouts/main';
import Fonts from '../components/fonts';
import { AnimatePresence } from 'framer-motion';
import Chakra from '../components/chakra';
import { Analytics } from '@vercel/analytics/react';

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

function Website({ Component, pageProps, router }) {
  useEffect(() => {
    // Prevent interactive zooming (Ctrl/Cmd + wheel, pinch-to-zoom, etc.)
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-')) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    // Detect browser zoom and counter-scale to enforce 100%
    const enforceZoom = () => {
      // Calculate the current zoom level (window.devicePixelRatio gives the zoom level)
      const zoomLevel = window.devicePixelRatio || 1;
      const counterScale = 1 / zoomLevel;

      // Apply counter-scale to the entire document
      document.documentElement.style.transform = `scale(${counterScale})`;
      document.documentElement.style.transformOrigin = '0 0';

      // Adjust the body's width to prevent layout issues
      document.documentElement.style.width = `${100 * zoomLevel}vw`;
      document.documentElement.style.height = `${100 * zoomLevel}vh`;
    };

    // Run on load and on resize (zoom changes often trigger resize events)
    enforceZoom();
    window.addEventListener('resize', enforceZoom);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', enforceZoom);
    };
  }, []);
  
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
      </Layout>
    </Chakra>
  );
}

export default Website;