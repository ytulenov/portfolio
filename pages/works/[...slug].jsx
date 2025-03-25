import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import { useColorModeValue } from '@chakra-ui/react';
import { Box, Container, Text, Heading, Flex, VStack, Button, List, ListItem } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";


const HighlightLink = ({ children, href, ...props }) => (
  <Text
    as="a"
    href={href}
    fontWeight="bold"
    _hover={{ textDecoration: "underline" }}
    fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
    target="_blank"
    rel="noopener noreferrer"
    {...props} 
  >
    {children}
  </Text>
);

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function WorkSlug({ source, frontmatter }) {
  const components = {
    h1: (props) => <Heading as="h1" fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} size="2xl" my={6} {...props} />,
    h2: (props) => <Heading as="h2"  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} size="xl" my={5} {...props} />,
    h3: (props) => <Heading as="h3" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} size="lg" my={4} {...props} />,
    h4: (props) => <Heading as="h4" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}  size="md" my={3} {...props} />,
    p: (props) => <Text pb={4} fontSize="lg" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} {...props} />,
    strong: (props) => <Text as="strong" fontWeight="bold" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}  my={4} {...props} />,
    em: (props) => <Text as="em" fontStyle="italic" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}  my={4} {...props} />,
    a: HighlightLink,
    ul: (props) => (
      <List
        style={{ marginLeft: 0, paddingLeft: "1em", listStyleType: "disc" }} 
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} 
        {...props}
        
      />
    ),
    li: (props) => <ListItem {...props} />, 
  };

  
  const images = [];
  for (let i = 1; i <= 6; i++) {
    const imageKey = `image${i}`;
    if (frontmatter[imageKey]) {
      const imageSrc = frontmatter[imageKey].startsWith('/')
        ? frontmatter[imageKey]
        : `/images/works/${frontmatter[imageKey]}`;
      images.push(imageSrc);
    }
  }

  
  const imageHeightPx = 200; 
  const spacingPx = 24; 
  const totalImagesHeightPx = images.length * imageHeightPx + (images.length - 1) * spacingPx;

  return (
    <Container maxW="80%" px={{ base: 4, md: 0 }} mt={{ base: -20, md: -28 }}>
      <Box mb={6}>
        <Link href="/works">
          <Text
            color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
            fontSize="md"
            _hover={{ textDecoration: "underline", color: useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK) }}
            transition="color 0.3s ease"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          >
            ← All Work Experience
          </Text>
        </Link>
      </Box>

      {/* Split-Screen Layout */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="stretch"
        border="3px solid"
        borderColor={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        
        borderRadius="3xl"
        overflow="hidden"
        
      >
        {/* Left Side: Images */}
        <Box
  flex={{ base: "100%", md: "65%" }}
  display="flex"
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
  p={{ base: 4, md: 6 }}
  minH={{ base: "auto", md: "auto" }} // Adjusted to allow dynamic height
  position="relative"
  overflow="hidden"
  bg={useColorModeValue(process.env.NEXT_PUBLIC_WORKSSLUGPAGE_IMAGEFIELD_BG_COLOR_LIGHT, process.env.NEXT_PUBLIC_WORKSSLUGPAGE_IMAGEFIELD_BG_COLOR_DARK)}
>
  {images.length > 0 ? (
    <VStack spacing={8} w="100%">
      {images.map((imageSrc, index) => {
        // Map index to the corresponding aspect ratio from metadata
        const aspectRatios = [
          frontmatter.image1AspectRatio,
          frontmatter.image2AspectRatio,
          frontmatter.image3AspectRatio,
          frontmatter.image4AspectRatio,
          frontmatter.image5AspectRatio,
        ];
        const aspectRatio = aspectRatios[index] || "3/2"; // Fallback to 3:2 if not specified
        return (
          <Box
            key={index}
            position="relative"
            w={{ base: "100%", md: "70%" }}
            aspectRatio={aspectRatio} // Dynamically set the aspect ratio
            ml={index % 2 === 0 ? { md: "-10%" } : { md: "10%" }}
            mr={index % 2 === 0 ? { md: "10%" } : { md: "-10%" }}
            pt={index === 0 ? 6 : undefined}
            pb={index === images.length - 1 ? 6 : (index === 1 ? 0 : undefined)}
            border="2px solid"
            borderColor={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            borderRadius="lg"
            boxShadow="md"
            overflow="hidden"
            bg={useColorModeValue("gray.300", "white")}
            _hover={{ "& img": { transform: "scale(1.05)" }, boxShadow: "lg" }}
            transition="box-shadow 0.3s ease"
          >
            <Image
              src={imageSrc}
              alt={`${frontmatter.companyname} image ${index + 1}`}
              fill={true}
              sizes="(max-width: 740px) 100vw, 40vw"
              style={{
                objectFit: "cover", // Still ensures the image is fully contained
                transition: "transform 0.5s ease",
                width: "100%",
                height: "100%",
              }}
              onError={(e) => console.error(`Failed to load image: ${imageSrc}`)}
              onLoad={() => console.log(`Successfully loaded image: ${imageSrc}`)}
              priority={index === 0}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="gray.800"
              color="white"
              fontSize="sm"
              textAlign="center"
              opacity={0}
              _groupHover={{ opacity: 1 }}
            >
              <Text>Image Not Found: {imageSrc}</Text>
            </Box>
          </Box>
        );
      })}
    </VStack>
  ) : (
    <Box
      position="relative"
      height={{ base: "50vh", md: "100%" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.800"
      color="white"
    >
      <Text>No Images Provided</Text>
    </Box>
  )}
</Box>

        {/* Right Side: Text and Content */}
        <Box
          flex={{ base: "100%", md: "50%" }}
          p={{ base: 6, md: 10 }}
          color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
             bg={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
          overflowY="auto"
          position="relative"
          minH={{ base: "50vh", md: `${totalImagesHeightPx}px` }} 
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgGradient: `linear(to-r, transparent, ${useColorModeValue(process.env.NEXT_PUBLIC_WORKSSLUGPAGE_RIGHTFIELD_BG_CENTER_GRADIENT_COLOR_LIGHT_RGB, process.env.NEXT_PUBLIC_WORKSSLUGPAGE_RIGHTFIELD_BG_CENTER_GRADIENT_COLOR_DARK_RGB)}, transparent)`,
            opacity: 0.1,
            zIndex: 0,
          }}
        >
          <VStack spacing={6} align="center" maxW="600px" w="100%" zIndex={1}>
            {/* Centered Title */}
            <Heading
              as="h1"
              size="3xl"
              fontWeight="extrabold"
              bgGradient={useColorModeValue(
                `linear(to-r, ${process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT}, ${process.env.NEXT_PUBLIC_BUTTON_BG_GRADIENT_SECONDCOLOR_LIGHT})`,
                `linear(to-r, ${process.env.NEXT_PUBLIC_BUTTON_BG_DARK}, ${process.env.NEXT_PUBLIC_BUTTON_BG_GRADIENT_SECONDCOLOR_DARK})`
              )}
              bgClip="text"
              textTransform="uppercase"
              letterSpacing="wide"
              transition="transform 0.3s ease"
              _hover={{ transform: "scale(1.05)" }}
              textAlign="center"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} 
            >
              {frontmatter.companyname}
            </Heading>

            {/* Centered Date */}
            <Text
              fontSize="18px"
              fontWeight="800"
              color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
              fontStyle="italic"
              transition="color 0.3s ease"
              textAlign="center"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} 
            >
              {formatDate(frontmatter.startedAt)} -{' '}
              {frontmatter.endedAt ? formatDate(frontmatter.endedAt) : 'Present'}
            </Text>

            {/* Centered Position */}
            <Text
              fontSize="lg"
              color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
              fontWeight="800"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} 
              textAlign="center"
            >
              Position: {frontmatter.position || "UI/UX Designer"}
            </Text>

            {/* MDX Content (Left-Aligned) */}
            <Box
              p={6}
              color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
              borderRadius="lg"
              border="1px solid"
              borderColor={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
              w="100%"
              textAlign="left"
            >
              <MDXRemote {...source} components={components} />
            </Box>

            {/* Centered Button */}
            <Flex justify="center" gap={4} mt={4} w="100%">
              <Button
                as={Link}
                href={frontmatter.companylink || `/works/${frontmatter.companyname.toLowerCase().replace(/\s+/g, '-')}`}
                 fontSize="18px"
                bgGradient={useColorModeValue(
                  `linear(to-r, ${process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT}, ${process.env.NEXT_PUBLIC_BUTTON_BG_GRADIENT_SECONDCOLOR_LIGHT})`,
                  `linear(to-r, ${process.env.NEXT_PUBLIC_BUTTON_BG_DARK}, ${process.env.NEXT_PUBLIC_BUTTON_BG_GRADIENT_SECONDCOLOR_DARK})`
                )}
                color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                _hover={{ transform: "translateY(-4px)", bgGradient: useColorModeValue(
                  `linear(to-r, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT}, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_GRADIENT_SECONDCOLOR_LIGHT})`,
                  `linear(to-r, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK}, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_GRADIENT_SECONDCOLOR_DARK})`
                ) }}
                borderRadius="md"
                boxShadow="lg"
                fontWeight="bold"  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} 
                transition="all 0.3s ease"
                _focus={{ outline: "none" }}
              >
                Company Website
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
}

export async function getStaticPaths() {
  const worksDir = path.join(process.cwd(), "public", "works");
  const files = await fs.readdir(worksDir, { withFileTypes: true });
  const mdxFiles = files.filter((file) => file.name.endsWith(".mdx")).map((file) => file.name);

  const paths = mdxFiles.map((file) => ({
    params: { slug: [file.replace(".mdx", "")] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.join(path.sep) : params.slug;
  const mdxPath = path.join(process.cwd(), "public", "works", `${slug}.mdx`);
  const fileContent = await fs.readFile(mdxPath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);
  const source = await serialize(content, {
    mdxOptions: { remarkPlugins: [], rehypePlugins: [] },
    scope: {},
  });

  return {
    props: {
      source,
      frontmatter,
    },
  };
}
