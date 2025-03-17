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
  const [isNavOpen, setIsNavOpen] = useState(false); // State to control navigation visibility

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      css={{ backdropFilter: 'blur(10px)' }}
      bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
      zIndex={100} // High zIndex for the navbar
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="95%"
        wrap="wrap"
        align="center"
        justify="center" 
        position="relative"
      >
        <Flex align="center" mr={10}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}  color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)} onClick={() => setIsNavOpen(false)}>
            <Logo />
          </Heading>
        </Flex>
        <Box flex={1} align="right" position="relative">
          <ThemeToggleButton />
          {/* Button to toggle navigation */}
          <IconButton
            as={Box}
            icon={<HamburgerIcon />}
            variant="outline"
            ml={2}
            color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
            bg={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            _hover={{
              bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_BUTTON_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_BUTTON_HOVER_DARK), // Slightly darker shade for hover
            }}
            aria-label={isNavOpen ? "Close page navigation" : "Open page navigation"}
            onClick={() => setIsNavOpen(!isNavOpen)} // Toggle navigation state
            zIndex={101} // Ensure button stays above everything
          />
        </Box>

        {/* Collapsible navigation content */}
        <Collapse in={isNavOpen} animateOpacity>
          <Box
            position="fixed"
            top="56px" // Adjust based on navbar height
            left={0}
            w="100vw"
            h="100vh"
            bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
            color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            zIndex={99} // Below the hamburger button
            py={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="column"
              spacing={20}
              align="center"
              justify="center"
            >
              <Button
                as={NextLink}
                href="/"
                
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize="48px"
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT,process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
              >
                HOME
              </Button>
              <Button
                as={NextLink}
                href="/works"
                
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize="48px"
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT,process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
              >
                WORK
              </Button>
              <Button
                as={NextLink}
                href="/eduleader"
                
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize="48px"
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT,process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
              >
                EDUCATION & LEADERSHIP
              </Button>
              <Button
                as={NextLink}
                href="/courseworks"
                
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize="48px"
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT,process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
              >
                COURSEWORK
              </Button>
              <Button
                as={NextLink}
                href="/projects"
                
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize="48px"
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT,process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
              >
                PROJECTS
              </Button>
              <Button
                as={NextLink}
                href="/posts"
                
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize="48px"
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT,process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
              >
                POSTS
              </Button>
              <Button
                as={NextLink}
                href="/contact"
                
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize="48px"
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT,process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
              >
                CONTACT &nbsp;   <FaEnvelope/>
              </Button>
              <Button
                as={NextLink}
                href="https://github.com/ytulenov?tab=repositories"
                target="_blank"
                
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                fontWeight="bold"
                fontSize="48px"
                bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_LIGHT,process.env.NEXT_PUBLIC_NAVBAR_TEXT_HOVER_DARK) }}
                onClick={() => setIsNavOpen(false)}
              >
                SOURCE &nbsp;   <IoLogoGithub />
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Navbar;