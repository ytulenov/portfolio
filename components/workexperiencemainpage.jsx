import { Box, Heading, VStack, HStack, Image as ChakraImage, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const WorkExperience = ({ experiences }) => {
  
  const boxBg = useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_BOXBG_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_BOXBG_DARK); 
  const circleBg = useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_CIRCLEBG_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_CIRCLEBG_DARK); 
  const lineColor = useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_LINECOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_LINECOLOR_DARK); 
  const borderColor = useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_BORDERCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_BORDERCOLOR_DARK); 

  return (
    <VStack spacing={8} align="stretch" position="relative" py={20}>
      {/* Work Experience Title */}
      <MotionBox
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        textAlign="left"
      >
        <Heading as="h1" 
            variant="page-title" 
            fontSize="3xl"fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
          WORK EXPERIENCE
        </Heading>
        <Heading mt={4} fontSize="lg" fontWeight="semibold" as="h3"  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} 
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
           An overview of my work history, spotlighting impactful positions and achievements along the way
        </Heading>
      </MotionBox>

      {/* Timeline Container */}
      <Box position="relative" mt={6}>
        {/* Vertical Line (Timeline) */}
        <Box
          position="absolute"
          left="50%"
          top="2"
          bottom="5"
          w="2px"
          bg={lineColor}
          transform="translateX(-50%)"
        />
         <Box
            position="absolute"
            left="50%"
            bottom="5px" 
            transform="translateX(-50%)"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {/* Small horizontal lines above the triangle */}
            <Box w="20px" h="2px" bg={lineColor} mb="2px" />
            <Box w="14px" h="2px" bg={lineColor} mb="2px" />
            <Box w="8px" h="2px" bg={lineColor} mb="2px" />
            {/* Triangle for the ground symbol */}
            <Box
              w="0"
              h="0"
              borderLeft="10px solid transparent"
              borderRight="10px solid transparent"
              borderTop={`10px solid ${lineColor}`} 
            />
          </Box>

        {/* Experience Timeline */}
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0; 
          const alignLeft = index === 0 || isLeft; 

          return (
            <HStack
              key={index}
              spacing={6}
              w="full"
              position="relative"
              align="flex-start"
              mb={12}
            >
              {/* Left Side (Date or Experience) */}
              {alignLeft ? (
                <>
                <Link href={`/works/${exp.link}`} passHref legacyBehavior>
                  {/* Experience Card */}
                  <Box
                  as="a"
                    w="50%"
                    p={4}
                    bg={boxBg}
                    borderRadius="2xl"
                    boxShadow="md"
                    position="relative"
                    border="6px solid"
                    borderColor={borderColor}
                    _hover={{
                      boxShadow: "lg",
                      cursor: "pointer",
                      "& h1": { // Target the Heading (h1) inside the Box on hover
                        textDecoration: "underline",
                      },
                    }}
                    transition="box-shadow 0.3s ease, text-decoration 0.3s ease"
                  >
                    <Heading
                      fontSize="xl" 
                      fontWeight="1000" 
                      as="h1"
                      mt={1}
                      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                      color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_DARK)}
                    >
                      {exp.title}
                    </Heading>
                    <Heading
                      fontSize="lg"
                      fontWeight="600" 
                      as="h3"
                      textAlign="left"
                      mt={3}
                      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                      color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_DARK)}
                    >
                      {exp.company}
                    </Heading>
                    <VStack spacing={3} mt={3} align="flex-start">
                      {exp.description.map((desc, i) => (
                        <Heading
                          key={i}
                          fontSize="lg"
                          fontWeight="thin"
                          as="h3"
                          fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                          color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_DARK)}
                        >
                          • {desc}
                        </Heading>
                      ))}
                    </VStack>
                  </Box>
                  </Link>

                  {/* Logo with line connection */}
                  <VStack position="relative">
                    <Box
                      bg={circleBg}
                      w="75px"
                      h="75px"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      zIndex="1"
                      mt={1}
                      overflow="hidden" 
                    >
                      <ChakraImage
                        src={exp.logo}
                        alt={exp.company}
                        w="100%" 
                        h="100%" 
                        objectFit="cover" 
                      />
                    </Box>
                  </VStack>

                  <Box w="50%" textAlign="left" pt={2} pr={7}>
                    <Heading fontSize="2xl" fontWeight="extrabold" as="h3" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}>
                      {exp.date}
                    </Heading>
                  </Box>
                </>
              ) : (
                <>
                  <Box w="50%" textAlign="right" pt={2} pl={7}>
                    <Heading fontSize="2xl" fontWeight="extrabold" as="h3" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}>
                      {exp.date}
                    </Heading>
                  </Box>

                  {/* Logo with line connection */}
                  <VStack position="relative">
                    <Box
                      bg={circleBg}
                      w="75px"
                      h="75px"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      zIndex="1"
                      mt={1}
                      overflow="hidden" 
                    >
                      <ChakraImage
                        src={exp.logo}
                        alt={exp.company}
                        w="100%" 
                        h="100%" 
                        objectFit="cover" 
                      />
                    </Box>
                  </VStack>

                  {/* Experience Card */}
                  <Link href={`/works/${exp.link}`} passHref legacyBehavior>
                  <Box
                    w="50%"
                    p={4}
                    as="a"
                    bg={boxBg}
                    borderRadius="2xl"
                    boxShadow="md"
                    position="relative"
                    border="4px solid" 
                    _hover={{
                      boxShadow: "lg",
                      cursor: "pointer",
                      "& h1": { // Target the Heading (h1) inside the Box on hover
                        textDecoration: "underline",
                      },
                    }}
                     transition="box-shadow 0.3s ease, text-decoration 0.3s ease"
                    borderColor={borderColor} 
                  >
                    <Heading
                      fontSize="xl" 
                      fontWeight="1000" 
                      as="h1"
                      mt={1}
                     
                      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                      color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_DARK)}
                    >
                      {exp.title}
                    </Heading>
                    <Heading
                      fontSize="lg"
                      textAlign="left"
                      fontWeight="600" 
                      as="h3"
                      mt={3}
                      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                      color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_DARK)}
                    >
                      {exp.company}
                    </Heading>
                    <VStack spacing={3} mt={3} align="flex-start">
                      {exp.description.map((desc, i) => (
                        <Heading
                          key={i}
                          fontSize="lg"
                          fontWeight="thin"
                          as="h3"
                          fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                          color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_WORKEXPERIENCE_TEXT_DARK)}
                        >
                          • {desc}
                        </Heading>
                      ))}
                    </VStack>
                  </Box></Link>
                </>
              )}
            </HStack>
          );
        })}
      </Box>
    </VStack>
  );
};

export default WorkExperience;