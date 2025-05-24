// components/MDXButton.js
import { Button, Box, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

const MDXButton = ({ text, href, download, ...props }) => {
  const buttonStyles = {
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "md",
    fontFamily: process.env.NEXT_PUBLIC_HEADING_H2_FONT,
    bg: useColorModeValue(
      process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT,
      process.env.NEXT_PUBLIC_BUTTON_BG_DARK
    ),
    color: useColorModeValue(
      process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT,
      process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK
    ),
    _hover: {
      bg: useColorModeValue(
        process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
        process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
      ),
    }, 
    ...props,
  };

  // Wrap the button in a Box for automatic centering
  const button = download ? (
    <Button as="a" href={href} download={download} {...buttonStyles}>
      {text}
    </Button>
  ) : (
    <Button as={NextLink} href={href} scroll={false} {...buttonStyles}>
      {text}
    </Button>
  );

  return (
    <Box display="flex" justifyContent="center" my={4}>
      {button}
    </Box>
  );
};

export default MDXButton;