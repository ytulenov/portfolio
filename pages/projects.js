import { useState } from 'react';
import { Box, Flex, Text, Image, Container, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link'; 
import matter from 'gray-matter'; 
import { IoLogoGithub } from 'react-icons/io5';



const ProjectBlock = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Container maxW="758px" position="relative" h="565px">
      <Box
        position="absolute"
        top="51.5%"
        left="51.25%"
        transform="translate(-50%, -50%)"
        width="98.5%"
        height="102%"
        bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        zIndex={-1}
        borderTopLeftRadius="24px"
        borderTopRightRadius="30px"
        borderBottomLeftRadius="30px"
        borderBottomRightRadius="3xl"
      />
      <Box
        w="100%"
        h="100%"
        borderRadius="2xl"
        bg={useColorModeValue(process.env.NEXT_PUBLIC_PROJECTS_CARD_BG_LIGHT, process.env.NEXT_PUBLIC_PROJECTS_CARD_BG_DARK)}
        overflow="hidden"
        position="relative"
        border="2px solid"
        borderColor={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      >
                <Link href={`/projects/${project.slug}`} passHref>
        <Box
          w="674px"
          h="379px"
          position="absolute"
          overflow="hidden"
          textAlign="center"
          top="50%"
          left="50%"
          transform="translate(-50%, -67%)"
          borderRadius={{ md: '2rem' }}
          p="20px 0"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={`/images/projects/${project.image}`}
            alt={project.title}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            objectFit="cover"
            transform={hovered ? 'scale(1.05)' : 'scale(1)'}
            transition="transform 0.3s ease"
            style={{
              aspectRatio: '1382 / 700',
              maxWidth: '674px',
              maxHeight: '379px',
            }}
          />
        </Box>
        </Link>
        <Flex
          direction="column"
          justify="center"
          p={6}
          top="70%"
          left="47%"
          transform="translateX(-50%)"
          color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
          
          position="absolute"
          w="674px"
        >
          <Text fontSize="1.45rem" fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}fontWeight="500" color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)} mb={1.75}>
            Featured Project
          </Text>
          <Link href={`/projects/${project.slug}`} passHref>
            <Text
              as="h2"
              fontSize="1.875rem"
              fontWeight="700"
              color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
              _hover={{ textDecor: 'underline' }}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            >
              {project.title}
            </Text>
          </Link>
          <Flex align="center" mt="8px">
            <Text
              as={Link}
              href={`/projects/${project.slug}`}
              color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
              _hover={{ textDecor: 'underline' }}
              pr="600px"
              pl="2.5px"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              fontSize="1.125rem"
              fontWeight="semibold"
            >
              Visit
            </Text>
            {project.githubLink && (
              <Link href={project.githubLink} target="_blank" passHref>
                <IoLogoGithub
                  fontSize="32px"
                  
                />
              </Link>
            )}
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

const FirstProjectLayout = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Container maxW="1580px" position="relative" h="495px" mx="auto">
      <Box
        position="absolute"
        top="52%"
        left="50.25%"
        transform="translate(-50%, -50%)"
        width="99%"
        height="103%"
        bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        zIndex={-1}
        borderTopLeftRadius="24px"
        borderTopRightRadius="36px"
        borderBottomLeftRadius="36px"
        borderBottomRightRadius="3xl"
      />
      <Box
        w="100%"
        h="100%"
        borderRadius="2xl"
        bg={useColorModeValue(process.env.NEXT_PUBLIC_PROJECTS_CARD_BG_LIGHT, process.env.NEXT_PUBLIC_PROJECTS_CARD_BG_DARK)}
        overflow="hidden"
        position="relative"
        border="2px solid"
        borderColor={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      >
          <Link href={`/projects/${project.slug}`} passHref>
        <Box
          w="715px"
          h="395px"
          position="absolute"
          overflow="hidden"
          right="780px"
          top="50%"
          transform="translateY(-50%)"
          borderRadius={{ md: '2rem' }}
          p="20px 0"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={`/images/projects/${project.image}`}
            alt={project.title}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            objectFit="cover"
            transform={hovered ? 'scale(1.05)' : 'scale(1)'}
            transition="transform 0.3s ease"
            style={{
              aspectRatio: '1280 / 720',
              maxWidth: '723px',
              maxHeight: '435px',
            }}
          />
        </Box>
        </Link>
        <Flex
          w={{ base: '100%', md: '40%' }}
          direction="column"
          justify="center"
          p={6}
          top="23%"
          color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
          textAlign={{ base: 'center', md: 'left' }}
          position="absolute"
          right="40"
        >
          <Text fontSize="2xl" fontWeight="medium"  color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}mb={2}>
            Featured Project
          </Text>
          <Link href={`/projects/${project.slug}`} passHref>
            <Text
              as="h2"
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="bold"
              mb={4}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
              color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
              _hover={{ textDecor: 'underline' }}
            >
              {project.title}
            </Text>
          </Link>
          <Text fontSize="xl"  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}  color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
            {project.summary}
          </Text>
          <Flex align="center" mt={6}>
            {project.githubLink && (
              <Link href={project.githubLink} target="_blank" passHref>
                <IoLogoGithub
                  fontSize="40px"
                  
                />
              </Link>
            )}
            <Button
              as={Link}
              href={`/projects/${project.slug}`}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              fontSize="18px" fontWeight="bold" borderRadius='md' 
              ml={4}
              bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
              color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
              
              p={2}
              px={{ base: 4, sm: 4, md: 6 }}
              
              
              _hover={{bg: useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK)}}
              w="160px"
              h="44px"
            >
              Visit Project
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default function Projects({ projects }) {

  const renderAllAsFirstProject = (projects.length - 2) % 3 === 0;
  return (
    <>
    <Heading      as="h1"
          size="4xl"
          textTransform="uppercase"
          letterSpacing="wide"
          fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
          color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
          lineHeight="1.1" mb={10} textAlign="center"   mt={{ base: -10, md: -14 }}>
        Projects
      </Heading>
     
    {projects.map((project, index) => {
      if (renderAllAsFirstProject) {
        
        return (
          <Box key={index} position="relative" h="auto" pb={32}>
            <FirstProjectLayout project={project} />
          </Box>
        );
      }

      if (index % 3 === 0) {
        
        return (
          <Box key={index} position="relative" h="auto" py={20}>
            <FirstProjectLayout project={project} />
          </Box>
        );
      }

      if (index % 3 === 1) {
        
        return (
          <Flex
            key={`row-${index}`}
            maxW="1640px"
            position="relative"
            mx="auto"
            direction="row"
            justify="space-between"
            py={24}
          >
            <ProjectBlock project={project} />
            {/* Check if there's a next project (2nd in the sequence) */}
            {projects[index + 1] && (
              <ProjectBlock project={projects[index + 1]} />
            )}
          </Flex>
        );
      }

      return null; 
    })}
  </>
);
}


export async function getStaticProps() {
  const path = require('path');
  const fs = require('fs');

  const projectsDir = path.join(process.cwd(), 'public/projects');
  const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.mdx'));
  const projectData = files.map(file => {
    const filePath = path.join(projectsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContent);

    return {
      title: frontmatter.title,
      image: frontmatter.image,
      summary: frontmatter.summary || '',
      githubLink: frontmatter.githubLink || '', 
      slug: file.replace('.mdx', ''), 
      
    };
  });

  
  

  return {
    props: {
      projects: projectData,
    },
  };
}