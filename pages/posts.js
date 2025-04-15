import { Box, Flex, Text, Image, Grid, Card, CardBody, Heading, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import matter from 'gray-matter';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function Posts({ Posts }) {
  return (
    <Flex direction="column" minH="100vh" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
      <Heading
        as="h1"
          size="4xl"
          textTransform="uppercase"
          letterSpacing="wide"
          lineHeight="1.1"
        mb={20}
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
        textAlign="center"
 mt={{ base: -10, md: -14 }}
      >
        Posts
      </Heading>
      <Box maxW="1200px" mx="auto" bg="transparent" pb={8}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          columnGap="80px"
          rowGap="98px"
        >
          {Posts.map((post, index) => (
            <Link
              key={index}
              href={`/posts/${post.slug}`}
              passHref
              legacyBehavior
            >
              <Card
                as="a"
                w="560px"
                h="623px"
                borderWidth="1px" 
                borderColor={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} 
                borderRadius={40}
                overflow="hidden"
                bg={useColorModeValue("#e9fad7", "transparent")}
                position="relative"
                cursor="pointer"
                _hover={{
                  "& .post-image": {
                    transform: 'scale(1.08)',
                    borderRadius: 40,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease, border-radius 0.3s ease',
                  },
                  "& .read-more-arrow": {
                    transform: 'translateX(6px)',
                    transition: 'transform 0.3s ease',
                  },
                }}
              >
                <Box w="560px" h="399px" borderRadius={40} overflow="hidden">
                  <Image
                    className="post-image"
                    src={`/images/posts/${post.image}`}
                    alt={post.title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    borderRadius={0}
                  />
                </Box>
                <CardBody p={4} display="flex" flexDirection="column" alignItems="flex-start">
                  <Text
                    fontSize="24px"
                    fontWeight="700"
                    lineHeight="1.333em"
                    color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                    fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                    mb="2px"
                    h="31px"
                    mt="52px"
                    noOfLines={1}
                  >
                    {post.title}
                  </Text>
                  <Text fontSize="18px" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mb="16px" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
                    {post.publishedDate ? formatDate(post.publishedDate) : 'N/A'}
                  </Text>
                  <Text
                    fontSize="18px"
                    color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                    mt={1}
                    mb="32px"
                    fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                  >
                    {post.summary}
                  </Text>
                  <Flex align="center" justify="flex-start">
                    <Text
                      fontSize="18px"
                      color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                      fontWeight="bold"
                      mr={2}
                      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                    >
                      Read post
                    </Text>
                    <Box
                      
                      fontSize="16px"
                      color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
                      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                    >
                      →
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
}

export async function getStaticProps() {
  const path = require('path');
  const fs = require('fs');

  const postsDir = path.join(process.cwd(), 'public/posts');
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.mdx'));
  const postData = files.map(file => {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContent);

    return {
      title: frontmatter.title,
      image: frontmatter.image,
      summary: frontmatter.summary || '',
      slug: file.replace('.mdx', ''),
      publishedDate: frontmatter.publishedDate ? new Date(frontmatter.publishedDate).toISOString() : null,
    };
  });

  postData.sort((a, b) => {
    const dateA = a.publishedDate ? new Date(a.publishedDate) : new Date(0);
    const dateB = b.publishedDate ? new Date(b.publishedDate) : new Date(0);
    return dateB - dateA; 
  });

  return {
    props: {
      Posts: postData,
    },
  };
}