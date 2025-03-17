import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import ModelNvidiaLoader from '../Model-Nvidia-loader'

const ModelNvidia = dynamic(() => import('../Model-Nvidia'), {
  ssr: false,
  loading: () => <ModelNvidiaLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

      <Container maxW="100%" pt={56}>
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
