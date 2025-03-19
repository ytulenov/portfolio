import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import ModelNvidiaLoader from '../Model-Nvidia-loader'
import { useEffect } from 'react'

const ModelNvidia = dynamic(() => import('../Model-Nvidia'), {
  ssr: false,
  loading: () => <ModelNvidiaLoader />
})

const Main = ({ children, router }) => {
  useEffect(() => {
    const enforceZoom = () => {
      if (typeof window !== 'undefined') {
        document.body.style.zoom = '100%';
      }
    };
    enforceZoom();
    window.addEventListener('resize', enforceZoom);
    return () => window.removeEventListener('resize', enforceZoom);
  }, []);

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=1800, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Yerkin's homepage" />
        <meta name="author" content="Yerkin Tulenov" />
        <meta name="author" content="personal website" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:title" content="Yerkin Tulenov" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@craftzNvidia" />
        <meta name="twitter:creator" content="@craftzNvidia" />
        <meta name="twitter:image" content="https://www.craftz.Nvidia/card.png" />
        <meta property="og:site_name" content="Yerkin Tulenov" />
        <meta name="og:title" content="Yerkin Tulenov" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.craftz.Nvidia/card.png" />
        <title>Yerkin Tulenov - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="1800px" pt={48}>
        {router.pathname === '/' && (
          <Box width="100%" mx="auto">
            <ModelNvidia />
          </Box>
        )}
        {children}
        <Footer />
      </Container>
    </Box> 
  )
}

export default Main