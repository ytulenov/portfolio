import NextLink from 'next/link';
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Container
      pb={{ base: '40vh', md: '30vh' }}
      mt={56}
      maxW={{ base: '90%', md: '80%' }}
    >
      <Heading
        as="h1"
        fontSize={{ base: '2xl', md: '4xl' }}
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
        color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      >
        Not found
      </Heading>
      <Text
        fontSize={{ base: 'md', md: 'lg' }}
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
        color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        mt={2}
      >
        The page you're looking for was not found.
      </Text>
      <Divider my={{ base: 4, md: 6 }} />
      <Box my={{ base: 4, md: 6 }} textAlign="center">
        <Button
          as={NextLink}
          href="/"
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight="bold"
          borderRadius="md"
          fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
          color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
          _hover={{
            bg: useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK),
          }}
          px={{ base: 4, md: 6 }}
          py={{ base: 2, md: 3 }}
        >
          Return to home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;