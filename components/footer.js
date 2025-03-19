import { Box, useColorModeValue, Flex, IconButton, Link } from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const iconSize = "2xl";
  const customIconSize = "20px";

  return (
    <Box
      as="footer"
      pt="2vh"
      pb="1vh"
      align="center"
      opacity={0.7}
      fontSize={{ base: 'sm', md: 'md' }}
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
      color={useColorModeValue(process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_LIGHT, process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_DARK)}
    >
      <Flex justify="center" align="center" direction="column" gap={{ base: 2, md: 3 }}>
        <Flex gap={{ base: 4, md: 8 }}>
          <IconButton
            as={Link}
            href="https://www.linkedin.com/in/ytulenov"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize={customIconSize} />}
            size={iconSize}
            variant="ghost"
            color={useColorModeValue(process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_LIGHT, process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_DARK)}
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
            color={useColorModeValue(process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_LIGHT, process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_DARK)}
            _hover={{ opacity: 1 }}
            isExternal
          />
          <IconButton
            as={Link}
            href="mailto:ytulenov@gmail.com"
            aria-label="Email"
            icon={<FaEnvelope fontSize={customIconSize} />}
            size={iconSize}
            variant="ghost"
            color={useColorModeValue(process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_LIGHT, process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR_DARK)}
            _hover={{ opacity: 1 }}
          />
        </Flex>
        <Box fontSize={{ base: 'xs', md: 'sm' }}>
          © {new Date().getFullYear()} Yerkin Tulenov. All Rights Reserved.
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;