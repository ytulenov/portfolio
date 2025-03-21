import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';


const OVERALL_BG_LIGHT = process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT;
const OVERALL_BG_DARK = process.env.NEXT_PUBLIC_OVERALL_BG_DARK;


const styles = {
  global: (props) => ({
    body: { 
      bg: mode(OVERALL_BG_LIGHT, OVERALL_BG_DARK)(props),
      fontFamily: 'Roboto', 
    }
  }), 
};



const fonts = {
  body: 'Roboto', 
};


const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({ config, styles, fonts });

export default theme;