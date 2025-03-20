import { Box, useColorModeValue, Flex, IconButton, Link } from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  // Define icon sizes (customize these values as needed)
  const iconSize = "2xl"; // Options: "xs", "sm", "md", "lg", "xl", "2xl", etc. (Chakra sizes)
  const customIconSize = "20px"; // Custom size in pixels or other units

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
            href="https://www.linkedin.com/in/ytulenov" // Fixed URL (added https://)
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize={customIconSize} />} // Custom size
            size={iconSize} // Chakra size
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
            icon={<FaGithub fontSize={customIconSize} />} // Custom size
            size={iconSize} // Chakra size
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
            icon={<FaEnvelope fontSize={customIconSize} />} // Custom size
            size={iconSize} // Chakra size
            variant="ghost"
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_LIGHT,
              process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_DARK
            )}
            _hover={{ opacity: 1 }}
          />
        </Flex>
        <Box>
          © {new Date().getFullYear()} Yerkin Tulenov. All Rights Reserved.
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;