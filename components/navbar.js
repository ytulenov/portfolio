import { forwardRef, useState } from 'react';
import Logo from './logo';
import NextLink from 'next/link';
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  IconButton,
  useColorModeValue,
  Button,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import ThemeToggleButton from './theme-toggle-button';
import { IoLogoGithub, IoMail } from 'react-icons/io5';
import { FaEnvelope } from 'react-icons/fa';

const Navbar = (props) => {
  const { path } = props;
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      css={{ backdropFilter: 'blur(10px)' }}
      bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
      zIndex={100}
      {...props}
    >
      <Container
        display="flex"
        p={{ base: 1, md: 2 }}
        maxW="95%"
        wrap="wrap"
        align="center"
        justify="center"
        position="relative"
        h={{ base: '50px', md: '56px' }}
      >
        <Flex align="center" mr={{ base: 2, md: 10 }}>
          <Heading
            as="h1"
            size={{ base: 'md', md: 'lg' }}
            letterSpacing="tighter"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            onClick={() => setIsNavOpen(false)}
          >
            <Logo />
          </Heading>
        </Flex>
        <Box flex={1} align="right" position="relative">
          <ThemeToggleButton />
          <IconButton
            as={Box}
            icon={<HamburgerIcon />}
            variant="outline"
            ml={{ base: 1, md: 2 }}
            color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
            bg={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            _hover={{
              bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_BUTTON_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_BUTTON_HOVER_DARK),
            }}
            aria-label={isNavOpen ? "Close page navigation" : "Open page navigation"}
            onClick={() => setIsNavOpen(!isNavOpen)}
            zIndex={101}
            size={{ base: 'sm', md: 'md' }}
          />
        </Box>

        <Collapse in={isNavOpen} animateOpacity>
          <Box
            position="fixed"
            top={{ base: '50px', md: '56px' }}
            left={0}
            w="100vw"
            h="100vh"
            bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
            color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            zIndex={99}
            py={{ base: 4, md: 6 }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            overflowY="auto" // Allow scrolling if content overflows
          >
            <Stack
              direction="column"
              spacing={{ base: 8, md: 10 }}
              align="center"
              justify="center"
            >
              <Button
                as={NextLink}
                href="/"
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize={{ base: 'lg', md: '48px' }}
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
                px={{ base: 4, md: 6 }}
                py={{ base: 2, md: 3 }}
              >
                HOME
              </Button>
              {/* Repeat for other buttons with same fontSize, px, py */}
              <Button
                as={NextLink}
                href="/works"
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize={{ base: 'lg', md: '48px' }}
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
                px={{ base: 4, md: 6 }}
                py={{ base: 2, md: 3 }}
              >
                WORK
              </Button>
              <Button
                as={NextLink}
                href="/eduleader"
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize={{ base: 'lg', md: '48px' }}
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
                px={{ base: 4, md: 6 }}
                py={{ base: 2, md: 3 }}
              >
                EDUCATION & LEADERSHIP
              </Button>
              <Button
                as={NextLink}
                href="/courseworks"
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize={{ base: 'lg', md: '48px' }}
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
                px={{ base: 4, md: 6 }}
                py={{ base: 2, md: 3 }}
              >
                COURSEWORK
              </Button>
              <Button
                as={NextLink}
                href="/projects"
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize={{ base: 'lg', md: '48px' }}
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
                px={{ base: 4, md: 6 }}
                py={{ base: 2, md: 3 }}
              >
                PROJECTS
              </Button>
              <Button
                as={NextLink}
                href="/posts"
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize={{ base: 'lg', md: '48px' }}
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
                px={{ base: 4, md: 6 }}
                py={{ base: 2, md: 3 }}
              >
                POSTS
              </Button>
              <Button
                as={NextLink}
                href="/contact"
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize={{ base: 'lg', md: '48px' }}
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
                px={{ base: 4, md: 6 }}
                py={{ base: 2, md: 3 }}
              >
                CONTACT <FaEnvelope />
              </Button>
              <Button
                as={NextLink}
                href="https://github.com/ytulenov?tab=repositories"
                target="_blank"
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize={{ base: 'lg', md: '48px' }}
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
                px={{ base: 4, md: 6 }}
                py={{ base: 2, md: 3 }}
              >
                SOURCE <IoLogoGithub />
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Navbar;