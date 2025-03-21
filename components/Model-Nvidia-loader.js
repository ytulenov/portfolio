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


export const NvidiaContainer = forwardRef(({ children }, ref) => (
  <AspectRatio
    ref={ref}
    ratio={13 / 7}
    w="100%"             
    maxW="1300px"        
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