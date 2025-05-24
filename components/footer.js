import { Box, useColorModeValue, Flex, IconButton, Link } from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import NextLink from 'next/link'; // Import NextLink for client-side navigation

const Footer = () => {
  const iconSize = "2xl";
  const customIconSize = "20px";

  return (
    <Box
      as="footer"
      pt={20}
      align="center"
      opacity={0.7}
      fontSize="md" 
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
      color={useColorModeValue(
        process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_LIGHT,
        process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_DARK
      )}
    >
      <Flex justify="center" align="center" direction="column" gap={2}>
        <Flex gap={8}>
          <IconButton
            as={Link}
            href="https://www.linkedin.com/in/ytulenov"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize={customIconSize} />}
            size={iconSize}
            variant="ghost"
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_LIGHT,
              process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_DARK
            )}
            _hover={{ opacity: 1 }}
            isExternal
          />
          <IconButton
            as={Link}
            href="https://github.com/ytulenov?tab=repositories"
            aria-label="GitHub"
            icon={<FaGithub fontSize={customIconSize} />}
            size={iconSize}
            variant="ghost"
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_LIGHT,
              process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_DARK
            )}
            _hover={{ opacity: 1 }}
            isExternal
          />
          <IconButton
            as={Link}
            href="/contact"
            aria-label="Email"
            icon={<FaEnvelope fontSize={customIconSize} />}
            size={iconSize}
            variant="ghost"
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_LIGHT,
              process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_DARK
            )}
            _hover={{ opacity: 1 }}
          />
        </Flex>
        <Flex gap={4} mt={2} justify="center" align="center">
          <Link
            as={NextLink}
            href="/privacy"
            fontSize="md"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT,
              process.env.NEXT_PUBLIC_LINK_COLOR_DARK
            )}
            _hover={{ opacity: 1, textDecoration: 'underline' }}
          >
            Privacy Policy
          </Link>
        </Flex>
        <Box>
          © {new Date().getFullYear()} Yerkin Tulenov. All Rights Reserved.
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;