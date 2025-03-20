import { forwardRef } from 'react';
import { AspectRatio, Box, Spinner } from '@chakra-ui/react';

export const NvidiaSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    transform="translate(-50%, -50%)"
  />
);
/*
export const NvidiaContainer = forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    className="voxel-Nvidia"
    m="auto"
    mt={['-20px', '-60px', '-120px']}
    mb={['-40px', '-140px', '-200px']} 
    w="100%"
    maxW="1300px"         // Perfect fit on your 1800px width screen
    aspectRatio="13 / 8"   // Maintains the 1300x800 ratio at any scale
    position="relative"
    display="flex"
    justifyContent="center"
    alignItems="center"
    overflow="visible"
  >
    {children}
  </Box>
));*/

export const NvidiaContainer = forwardRef(({ children }, ref) => (
  <AspectRatio
    ref={ref}
    ratio={13 / 7}
    w="100%"             // Fluid width: scales with parent
    maxW="1300px"        // Maximum width remains 1300px on large screens
    mt={['-20px', '-60px', '-150px']}
    mb={['-40px', '-140px', '-200px']} 
    position="relative"
    overflow="visible"
    mx="auto"   
  >
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  </AspectRatio>
));

const Loader = () => {
  return (
    <NvidiaContainer>
      <NvidiaSpinner />
    </NvidiaContainer>
  );
};

export default Loader;