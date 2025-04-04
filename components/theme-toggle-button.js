import { AnimatePresence, motion } from 'framer-motion';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle theme"
          bg={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
          color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
          _hover={{
            bg: useColorModeValue(process.env.NEXT_PUBLIC_NAVBAR_BUTTON_HOVER_LIGHT, process.env.NEXT_PUBLIC_NAVBAR_BUTTON_HOVER_DARK), 
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeToggleButton;