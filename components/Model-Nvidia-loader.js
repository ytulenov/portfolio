import { forwardRef } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

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
  <Box
    ref={ref}
    className="voxel-Nvidia"
    m="auto"
    mt={['-20px', '-60px', '-120px']}
    mb={['-40px', '-140px', '-200px']} 
    w="100%"
    maxW={[1000, 12000, 1300]} // Increased to accommodate the model's rotation
    h={[400, 600, 800]} // Increased to match width and ensure visibility
    position="relative"
    display="flex"
    justifyContent="center"
    alignItems="center"
    overflow="visible" // Ensure the model isn't clipped during rotation
  >
    {children} 
  </Box>
));

const Loader = () => {
  return (
    <NvidiaContainer>
      <NvidiaSpinner />
    </NvidiaContainer>
  );
};

export default Loader;