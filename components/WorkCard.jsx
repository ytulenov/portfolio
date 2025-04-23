import { Box, Text, Flex, Image, Button, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { parse, format } from "date-fns";

export default function WorkCard({ work, index }) {
  const { companyname, mainpagesummary, startedAt, endedAt, position, companylink, image, mainpagecolor, location } = work.frontmatter;

  const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return '';
    try {
      const date = parse(dateString, 'yyyy-MM', new Date());
      return format(date, 'MM/yyyy');
    } catch (error) {
      console.error(`Invalid date format for: ${dateString}`, error);
      return '';
    }
  };

  const isReversed = index % 2 === 1;

  return (
    <>
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
        p={10} 
        color={useColorModeValue(
          process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
          process.env.NEXT_PUBLIC_OVERALL_BG_DARK
        )}
        transition="background 0.3s"
        w="full"
        maxW="1800px" 
        minH="70vh" 
        align="center"
        justify="space-between"
        position="relative"
        direction={isReversed ? 'row-reverse' : 'row'}
        className={isReversed ? 'reverse' : ''}
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
              boxShadow: useColorModeValue(
                process.env.NEXT_PUBLIC_WORKSMAINPAGE_IMAGE_BOXSHADOW_LIGHT_HOVER,
                process.env.NEXT_PUBLIC_WORKSMAINPAGE_IMAGE_BOXSHADOW_DARK_HOVER
              ),
            }}
            boxShadow={useColorModeValue(
              process.env.NEXT_PUBLIC_WORKSMAINPAGE_IMAGE_BOXSHADOW_LIGHT,
              process.env.NEXT_PUBLIC_WORKSMAINPAGE_IMAGE_BOXSHADOW_DARK
            )}
            borderRadius="15px"
            overflow="hidden"
            ml={isReversed ? 0 : 4} 
            mr={isReversed ? 4 : 0} 
            flexShrink={0}
            borderWidth="4px"
            borderColor={mainpagecolor}
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ cursor: 'pointer' }}
            width={{ base: "100%", md: "791px" }} 
            height="450px"
          >
            <Image
              src={`/images/works/${image}`}
              alt={`${companyname} image`}
              width="791"
              bg="#ffffff"
              height="450"
              objectFit="fill"
              transition="all 0.6s ease"
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        </Link>

        {/* Text and Button */}
        <Box
          flex="1"
          textAlign="center"
          mr={isReversed ? 0 : 4} 
          ml={isReversed ? 4 : 0} 
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minW="0" 
          padding="1rem"
        >
          <Box
            bg={useColorModeValue(
              process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
              process.env.NEXT_PUBLIC_OVERALL_BG_DARK
            )}
            border="3px solid"
            borderColor={mainpagecolor}
            borderRadius="md"
            mb={6}
            px={4}
            py={2}
            display="inline-block"
          >
            <Text
              fontSize="2xl"
              fontWeight="900"
              color={useColorModeValue(
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
              )}
              textTransform="uppercase"
              textAlign="center"
              mb={2}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            >
              {companyname.toUpperCase()}
            </Text>
            <Text
              fontSize="md"
              color={useColorModeValue(
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
              )}
              mb={2}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            >
              Position: {position || 'Engineer'}
            </Text>
            <Text
              fontSize="md"
              color={useColorModeValue(
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
              )}
              mb={2}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            >
              {location}
            </Text>
            <Text
              fontSize="sm"
              color={useColorModeValue(
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
              )}
              mb={2}
              fontStyle="italic"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            >
              {formatDate(startedAt)} - {endedAt ? formatDate(endedAt) : 'Present'}
            </Text>
          </Box>
          <Text
            fontSize="18px"
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
            )}
            mb={4}
            textAlign="center"
            width="90%"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          >
            {mainpagesummary.split('Solution:')[0]}
            <br />
          </Text>
          <Box className="button-wrap" display="flex" alignItems="center" justifyContent="center" gap={4}>
            <Button
              as={Link}
              href={companylink || `/works/${work.slug}`}
              fontSize="18px"
              bg={`linear-gradient(315deg, ${mainpagecolor} 0%, ${mainpagecolor}80 100%)`}
              color={useColorModeValue(
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                process.env.NEXT_PUBLIC_OVERALL_BG_DARK
              )}
              _hover={{ transform: 'translateY(-6px)', bg: `linear-gradient(315deg, ${mainpagecolor} 0%, ${mainpagecolor}80 100%)` }}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              fontWeight="bold"
              borderRadius="md"
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
              bg={`linear-gradient(315deg, ${mainpagecolor} 0%, ${mainpagecolor}80 100%)`}
              color={useColorModeValue(
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                process.env.NEXT_PUBLIC_OVERALL_BG_DARK
              )}
              _hover={{ transform: 'translateY(-6px)', bg: `linear-gradient(315deg, ${mainpagecolor} 0%, ${mainpagecolor}80 100%)` }}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              fontWeight="bold"
              borderRadius="md"
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