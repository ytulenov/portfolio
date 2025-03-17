import Link from 'next/link'
import { Text, useColorModeValue } from '@chakra-ui/react'
import FootprintIcon from './icons/footprint'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 24px;
  display: inline-flex;
  align-items: center;
  height: 30px; /* Fixed height for the entire logo container */
  padding: 0 10px;
  svg {
    transition: 200ms ease;
    height: 24px; /* Matches the font-size of text */
    width: auto;  /* Maintains aspect ratio */
  } 
  &:hover > svg {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <FootprintIcon />
        <Text
          color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
          fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
          fontWeight="bold"
          ml="2px"
          pt={1}
          fontSize="24px" /* Explicitly set to match container */
        >
          &nbsp; YERKIN &nbsp; TULENOV
        </Text>
      </LogoBox>
    </Link>
  );
}

export default Logo