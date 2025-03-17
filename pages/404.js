import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button,
  useColorModeValue
} from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Container pb={530}  mt={{ base: -10, md: -14 }}>
      <Heading as="h1" fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>Not found</Heading>
      <Text fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}> The page you&apos;re looking for was not found.</Text>
      <Divider my={6} />
      <Box my={6} align="center">
        <Button as={NextLink} href="/" fontSize="18px" fontWeight="bold" borderRadius='md'  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)} color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
        _hover={{
          bg: useColorModeValue(
            process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
            process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
          ),}}>
          Return to home
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
