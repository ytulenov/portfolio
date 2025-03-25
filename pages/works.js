import { Box, Flex, VStack, Heading, useColorModeValue } from '@chakra-ui/react';
import WorkCard from '/components/WorkCard';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Works({ works }) {
  return (
    <Flex
      direction="column"
      minH="100vh"
      color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      alignItems="center"
      mt={{ base: -10, md: -14 }}
      position="relative"
    >
      <Heading
      as="h1"
      size="4xl"
      textTransform="uppercase"
      letterSpacing="wide"
      lineHeight="1.1"
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
        
        mb={12}
        textAlign="center"
        color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        
      >
        Work Experience
      </Heading>
      <Box maxW="100%" w="full" overflowY="auto" h="100vh" flex="1">
        <VStack spacing={0} align="stretch">
        {works.map((work, index) => (
        <WorkCard key={work.slug} work={work} index={index} />
      ))}
        </VStack>
      </Box>
    </Flex>
  );
}

export async function getStaticProps() {
  const worksDir = path.join(process.cwd(), 'public/works');
  const files = (await fs.readdir(worksDir)).filter(file => file.endsWith('.mdx'));
  const worksData = await Promise.all(files.map(async (file) => {
    const filePath = path.join(worksDir, file);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContent);
    return { frontmatter, slug: file.replace('.mdx', '') };
  }));

  worksData.sort((a, b) => new Date(b.frontmatter.startedAt) - new Date(a.frontmatter.startedAt));

  return {
    props: {
      works: worksData,
    },
  };
}
