import { useState, useEffect } from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(calc(-100% + 40px)); }
`;

const SpinningBlock = ({ label, finalValue, generateRandom, spinDuration = 30000 }) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const randomValues = Array.from({ length: 300 }, generateRandom);
    setValues([...randomValues, finalValue]);
  }, [finalValue, generateRandom]);

  return (
    <Box
      bg={useColorModeValue(
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
      )}
      p={4}
      borderRadius="full"
      textAlign="center"
      display="inline-block"
      height="100px"
      width={{ base: "100%", md: "300px" }} 
      maxW="400px"
    >
      <Text
        fontSize="lg"
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
        fontWeight="medium"
        color={useColorModeValue(
          process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
          process.env.NEXT_PUBLIC_OVERALL_BG_DARK
        )}
      >
        {label}
      </Text>
      <Box position="relative" height="40px" overflow="hidden">
        <Box sx={{ animation: `${spin} ${spinDuration}ms linear forwards` }}>
          {values.map((value, index) => (
            <Text
              key={index}
              fontSize="2xl"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              fontWeight="bold"
              height="40px"
              color={useColorModeValue(
                process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
                process.env.NEXT_PUBLIC_OVERALL_BG_DARK
              )}
            >
              {value}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SpinningBlock;