'use client';

import { Button } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

export default function MDXButton({ href, children }) {

  return (
    <Button
      as={Link}
      href={href}
      textDecoration="none"
      
       mx={2} fontSize="18px" _hover={{
          bg: useColorModeValue(
            process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
            process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
          ),}}
          color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
                 fontWeight="bold" borderRadius='md' fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}  bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
    >
      {children}
    </Button>
  );
}