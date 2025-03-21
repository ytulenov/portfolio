import Head from 'next/head';
import dynamic from 'next/dynamic';
import NavBar from '../navbar';
import { Box, Container, Text, VStack } from '@chakra-ui/react';
import Footer from '../footer';
import ModelNvidiaLoader from '../Model-Nvidia-loader';
import { useEffect, useState } from 'react';

const ModelNvidia = dynamic(() => import('../Model-Nvidia'), {
  ssr: false,
  loading: () => <ModelNvidiaLoader />
});

const Main = ({ children, router }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices (iPhone, iPad or Android)
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
    const mobileCheck = /iphone|ipad|android/.test(userAgent);
    setIsMobile(mobileCheck);

    // Enforce zoom for non-mobile devices
    const enforceZoom = () => {
      if (typeof window !== 'undefined' && !mobileCheck) {
        document.body.style.zoom = '100%';
      }
    };
    enforceZoom();
    window.addEventListener('resize', enforceZoom);
    return () => window.removeEventListener('resize', enforceZoom);
  }, []);

  // Mobile block message component
  const MobileBlockMessage = () => (
    <VStack 
      minH="100vh" 
      justify="center" 
      align="center" 
      spacing={4} 
      textAlign="center"
      p={4}
    >
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
        Website Under Construction
      </Text>
      <Text fontSize={{ base: "md", md: "lg" }}>
        This website is not yet optimized for mobile devices.
      </Text>
      <Text fontSize={{ base: "sm", md: "md" }}>
        Please visit us from a desktop computer for the best experience.
      </Text>
    </VStack>
  );

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Yerkin's homepage" />
        <meta name="author" content="Yerkin Tulenov" />
        <meta name="author" content="personal website" />
        <link rel="cpu" href="cpu.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>Yerkin Tulenov - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      {isMobile ? (
        <MobileBlockMessage />
      ) : (
        <Container maxW={{ base: "100%", md: "90vw", lg: "1800px" }} pt={{ base: 12, md: 24, lg: 48 }}>
          {router.pathname === '/' && (
            <Box width="100%" mx="auto">
              <ModelNvidia />
            </Box>
          )}
          {children}
          <Footer />
        </Container>
      )}
    </Box>
  );
};

export default Main;