import { Box, Text, Flex, Image, Button, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link'; // Corrected import from 'next/link'

export default function WorkCard({ work, index }) {
  const { companyname, mainpagesummary, startedAt, endedAt, position, companylink, image, mainpagecolor } = work.frontmatter;

  // Custom date format to match "1/1/2019 - 12/30/2025"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Determine if the layout should be reversed (image on right, text on left) based on index
  const isReversed = index % 2 === 1;

  return (
    <>
      {/* Add animations directly within the component */}
      <style jsx global>{`
        @keyframes ring {
          0% {
            width: 30px;
            height: 30px;
            opacity: 1;
          }
          100% {
            width: 150px;
            height: 60px;
            opacity: 0;
          }
        }
      `}</style>

      <Flex
        as="div"
        p={20}
        color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
        transition="background 0.3s"
        w="full"
        h="70vh"
        align="center"
        justify="space-between"
        position="relative"
        overflow="hidden"
        direction={isReversed ? 'row-reverse' : 'row'} // Alternate layout
        className={isReversed ? 'reverse' : ''} // Add reverse class for SCSS matching
      >
        {/* Linkable Rotated Image */}
        <Link href={`/works/${work.slug}`} passHref>
  <Box
    perspective="800px"
    transform={isReversed ? 'rotateY(-20deg) rotateX(10deg) scale(0.8)' : 'rotateY(20deg) rotateX(10deg) scale(0.8)'}
    transition="all 0.6s ease"
    _hover={{
      transform: isReversed
        ? 'perspective(800px) rotateY(15deg) rotateX(10deg) scale(0.95)'
        : 'perspective(800px) rotateY(-15deg) rotateX(10deg) scale(0.95)',
      filter: 'blur(0.2px)',
      opacity: 1,
      boxShadow: useColorModeValue(process.env.NEXT_PUBLIC_WORKSMAINPAGE_IMAGE_BOXSHADOW_LIGHT_HOVER, process.env.NEXT_PUBLIC_WORKSMAINPAGE_IMAGE_BOXSHADOW_DARK_HOVER)
    }}
    boxShadow={useColorModeValue(process.env.NEXT_PUBLIC_WORKSMAINPAGE_IMAGE_BOXSHADOW_LIGHT, process.env.NEXT_PUBLIC_WORKSMAINPAGE_IMAGE_BOXSHADOW_DARK)}
    borderRadius="15px"
    overflow="hidden"
    ml={isReversed ? 0 : 100}
    mr={isReversed ? 100 : 0}
    flexShrink={0}
    display="flex"
    alignItems="center"
    justifyContent="center"
    style={{ cursor: 'pointer' }}
    width="791px"  // Explicitly set the container width
    height="450px" // Explicitly set the container height
  >
    <Image
      src={image || '/images/works/default.png'}
      alt={`${companyname} image`}
      width="791"  // Match container width
      height="450" // Match container height
      objectFit="fill" // Stretch to fill the container
      transition="all 0.6s ease"
      style={{ width: '100%', height: '100%' }} // Ensure it fills the Box
    />
  </Box>
</Link>

        {/* Text and Button */}
        <Box
          flex="1"
          textAlign="center"
          mr={isReversed ? 0 : 10}
          ml={isReversed ? 10 : 0}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="50%"
          padding="1rem"
        
        >
          <Box
            bg={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            border="3px solid"
            borderColor={mainpagecolor} // Use mainpagecolor for border
            borderRadius="md"
            mb={6}
            px={4}
            py={2}
            display="inline-block"
          >
            <Text
              fontSize="2xl"
              fontWeight="900"
              color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
              textTransform="uppercase"
              textAlign="center"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            >
              {companyname.toUpperCase()}
            </Text>
            <Text fontSize="md" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mb={2}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
              Position: {position || 'UI/UX Designer'}
            </Text>
            <Text fontSize="sm" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mb={2} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
              {formatDate(startedAt)} - {endedAt ? formatDate(endedAt) : 'Present'}
            </Text>
          </Box>
          <Text fontSize="18px" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mb={4} textAlign="center" width="90%" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
            {mainpagesummary.split('Solution:')[0]}
            <br />
          </Text>
          <Box className="button-wrap" display="flex" alignItems="center" justifyContent="center" gap={4}>
            <Button
              as={Link}
              href={companylink || `/works/${work.slug}`}
            fontSize="18px"
              bg={`linear-gradient(315deg, ${mainpagecolor} 0%, ${mainpagecolor}80 100%)`} // Gradient with mainpagecolor
              color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
              _hover={{ transform: 'translateY(-6px)', bg: `linear-gradient(315deg, ${mainpagecolor} 0%, ${mainpagecolor}80 100%)` }}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              fontWeight="bold" borderRadius='md' 
              boxShadow={`9px 7px 32px -11px ${mainpagecolor}80`}
              transition="all 0.3s ease-in-out"
              position="relative"
              _focus={{ outline: 'none' }}
              css={{
                '&::before': {
                  content: "''",
                  borderRadius: '7px',
                  minWidth: 'calc(100px + 12px)',
                  minHeight: 'calc(43px + 12px)',
                  border: `3px solid ${mainpagecolor}80`,
                  boxShadow: `0 0 60px ${mainpagecolor}64`,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0,
                  transition: 'all 0.3s ease-in-out',
                },
                '&:hover::before, &:focus::before': {
                  opacity: 1,
                },
                '&::after': {
                  content: "''",
                  width: '30px',
                  height: '30px',
                  borderRadius: '7px',
                  border: `6px solid ${mainpagecolor}`,
                  position: 'absolute',
                  zIndex: -1,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'ring 1.5s infinite',
                },
                '&:hover::after, &:focus::after': {
                  animation: 'none',
                  display: 'none',
                },
              }}
            >
              Visit →
            </Button>
            <Button
              as={Link}
              href={`/works/${work.slug}`}
               fontSize="18px"
              bg={`linear-gradient(315deg, ${mainpagecolor} 0%, ${mainpagecolor}80 100%)`} // Gradient with mainpagecolor
              color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
              _hover={{ transform: 'translateY(-6px)', bg: `linear-gradient(315deg, ${mainpagecolor} 0%, ${mainpagecolor}80 100%)` }}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              fontWeight="bold" borderRadius='md' 
              boxShadow={`9px 7px 32px -11px ${mainpagecolor}80`}
              transition="all 0.3s ease-in-out"
              position="relative"
              _focus={{ outline: 'none' }}
              css={{
                '&::before': {
                  content: "''",
                  borderRadius: '7px',
                  minWidth: 'calc(100px + 12px)',
                  minHeight: 'calc(43px + 12px)',
                  border: `3px solid ${mainpagecolor}80`,
                  boxShadow: `0 0 60px ${mainpagecolor}64`,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0,
                  transition: 'all 0.3s ease-in-out',
                },
                '&:hover::before, &:focus::before': {
                  opacity: 1,
                },
                '&::after': {
                  content: "''",
                  width: '30px',
                  height: '30px',
                  borderRadius: '7px',
                  border: `6px solid ${mainpagecolor}`,
                  position: 'absolute',
                  zIndex: -1,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'ring 1.5s infinite',
                },
                '&:hover::after, &:focus::after': {
                  animation: 'none',
                  display: 'none',
                },
              }}
            >
              Details →
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
}