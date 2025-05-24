import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import { Box, Container, Text, Heading, useColorModeValue, List } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { promises as fs } from "fs";
import path from "path";
import Section from "../../components/section"; // Import Section component
import FastVideo from "../../components/FastVideo"; // Adjust path if needed
import MDXButton from "../../components/MDXButton";
const CodeBlock = dynamic(() => import("../../components/CodeBlock"), { ssr: false });
const DataTable = dynamic(() => import("../../components/DataTable"), { ssr: false });
const ChartComponent = dynamic(() => import("../../components/Chart"), { ssr: false });
const GlbViewer = dynamic(() => import("../../components/GlbViewer"), { ssr: false });
const GitHubRepoBrowser = dynamic(() => import("../../components/GitHubRepoBrowser"), { ssr: false });
import { parse, format } from "date-fns"; // Add date-fns import
const Viewer = dynamic(() => import('../../components/DocxViewer'), { ssr: false });
import ImageCarousel from '../../components/ImageCarousel'; // Add import for ImageCarousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HighlightLink = ({ children, href, ...props }) => (
  <Text
    as="a"
    href={href}
    color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
    fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
    fontWeight="bold"
    _hover={{ textDecoration: "underline" }}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </Text>
);

const Highlight = ({ text, ...props }) => (
  <Text
    as="span"
    bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
    px={0.5}
    borderRadius="md"
    fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
    color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
    {...props}
  >
    {text}
  </Text>
);

const SiteLinkWithPhoto = ({ image, href, alt = "", ...props }) => {
  return (
    <Box
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      display="block"
      overflow="hidden"
      borderRadius="lg"
      position="relative"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "lg",
        transition: "all 0.3s ease",
      }}
      {...props}
    >
      <Image
        src={`/images/projects/${image}`}
        alt={alt}
        width={600}
        height={400}
        style={{ objectFit: "cover", width: "100%", height: "100%", aspectRatio: "1920 / 1080" }}
      />
    </Box>
  );
};

const SitesLinksWithPhoto = ({ links = [], ...props }) => (
  <Box
    display="flex"
    justifyContent="center"
    flexWrap="wrap"
    gap={20}
    {...props}
  >
    {links.map((link, index) => (
      <Box
        key={index}
        as="a"
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        display="block"
        overflow="hidden"
        borderRadius="lg"
        position="relative"
        maxWidth="400px"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "lg",
          transition: "all 0.3s ease",
        }}
      >
        <Image
          src={`/images/projects/${link.image}`}
          alt={link.alt}
          width={1920}
          height={1080}
          style={{ objectFit: "cover", width: "100%", height: "auto", aspectRatio: "1920 / 1080" }}
        />
        <Text
          textAlign="center"
          mt={2}
          fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          color={useColorModeValue(
            process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
            process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
          )}
          fontSize="md"
          fontWeight="semibold"
        >
          {link.alt}
        </Text>
      </Box>
    ))}
  </Box>
);

const formatDate = (dateString) => {
  if (!dateString || typeof dateString !== "string") return "";
  try {
    const date = parse(dateString, "yyyy-MM", new Date());
    return format(date, "MMMM yyyy");
  } catch (error) {
    console.error(`Invalid date format for: ${dateString}`, error);
    return "";
  }
};

const resolvePath = (filePath, baseDir) => {
  if (filePath.startsWith('/')) {
    return filePath;
  }

  const imageExtensions = ['.jpg', '.jpeg', '.png'];
  const supportExtensions = ['.glb', '.xlsx', '.pdf', '.docx']; // Add .docx

  if (imageExtensions.some(ext => filePath.toLowerCase().endsWith(ext))) {
    const resolvedPath = `/images/projects/${filePath}`;
    console.log(`Resolving image path: ${filePath} -> ${resolvedPath}`);
    return resolvedPath;
  }

  if (supportExtensions.some(ext => filePath.toLowerCase().endsWith(ext))) {
    const supportDir = '/files';
    const resolvedPath = path.posix.join(supportDir, filePath);
    console.log(`Resolving support file path: ${filePath} -> ${resolvedPath}`);
    return resolvedPath;
  }

  const resolvedPath = path.posix.join(baseDir, filePath);
  console.log(`Resolving path: ${filePath} -> ${resolvedPath}`);
  return resolvedPath;
};

export default function ProjectsPage({ source, frontmatter, baseDir, params }) {
  const components = {
    h1: (props) => <Heading as="h1" size="2xl" fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} my={6} {...props} />,
    h2: (props) => <Heading as="h2" size="xl" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} my={5} {...props} />,
    h3: (props) => <Heading as="h3" size="lg" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} my={4} {...props} />,
    h4: (props) => <Heading as="h4" size="md" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} my={3} {...props} />,
    p: (props) => <Text pb={4} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} {...props} />,
    strong: (props) => <Text as="strong" fontWeight="bold" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} my={4} {...props} />,
    em: (props) => <Text as="em" fontStyle="italic" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} my={4} {...props} />,
    a: ({ href, children, ...props }) =>
      href.startsWith("http") || href.startsWith("#") ? (
        <a href={href} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} {...props}>
          {children}
        </a> 
      ) : (
        <Link href={href} legacyBehavior>
          <a fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} {...props}>{children}</a>
        </Link>
      ),
    br: () => <Box as="br" />, 
    HighlightLink,
    Highlight,
    SiteLinkWithPhoto,
    ImageCarousel,
    SitesLinksWithPhoto,
    code: CodeBlock, 
    Viewer,
     ul: (props) => (
      <List
        style={{ marginLeft: 0, paddingLeft: "1.5em", listStyleType: "disc" }} 
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} 
        {...props}
        
      />
    ),
    ol: (props) => (
      <Box
        as="ol"
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
        color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        pl={6}
        ml={0}
        style={{ listStylePosition: "outside", paddingLeft: "1em" }}
        {...props}
      />
    ),
    li: (props) => (
      <Box
        as="li"
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
        color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        ml={0}
        {...props}
      />
    ),
    img: ({ src, alt, ...props }) => {
      const resolvedSrc = resolvePath(src, baseDir); 
      return (
        <Image
          src={resolvedSrc}
          alt={alt || ''}
          width={1382}
          height={700}
          style={{ objectFit: "fill", height: "100%", width: "100%", aspectRatio: '1382 / 700' }}
          {...props}
        />
      );
    },
    table: (props) => {
      const resolvedSrc = props.src ? resolvePath(props.src, baseDir) : undefined;
      console.log(`Rendering DataTable with src: ${resolvedSrc}`);
      return <DataTable {...props} src={resolvedSrc} />;
    },
    Chart: ChartComponent,
    GlbViewer: (props) => {
      const resolvedSrc = resolvePath(props.src, baseDir);
      console.log(`Rendering GlbViewer with src: ${resolvedSrc}`);
      return <GlbViewer {...props} src={resolvedSrc} />;
    },
    DataTable: (props) => {
      const resolvedSrc = props.src ? resolvePath(props.src, baseDir) : undefined;
      console.log(`Rendering DataTable (direct) with src: ${resolvedSrc}`);
      return <DataTable {...props} src={resolvedSrc} />;
    },
    GitHubRepoBrowser: (props) => {
      console.log(`Rendering GitHubRepoBrowser with repoUrl: ${props.repoUrl}`);
      return <GitHubRepoBrowser {...props} />;
    },
    FastVideo,
    Button: MDXButton,
  };

  const slug = frontmatter.slug || (Array.isArray(params?.slug) ? params.slug.join('/') : params?.slug || '');

  return (
    
    <Container maxW="80%" pb={24} mt={{ base: -20, md: -28 }}>
            <Section delay={0.1}>

      <Box mb={6}>
        <Link href="/projects" legacyBehavior>
          <Text
            as="a"
            _hover={{
              textDecoration: "underline",
              color: useColorModeValue(
                process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
                process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
              ),
            }}
            fontSize="md"
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT,
              process.env.NEXT_PUBLIC_BUTTON_BG_DARK
            )}
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          >
            ← Back to all Projects
          </Text>
        </Link>
      </Box>
      </Section>

<Section delay={0.2}>
      <Box mb={8} rounded="xl" overflow="hidden" style={{ height: "700px", width: "100%" }}>
        {frontmatter.image ? (
          <Link href={frontmatter.link || `/projects/${slug}`} passHref legacyBehavior key={slug}>
            <Box as="a" display="block" height="100%" width="100%">
              <Image
                src={resolvePath(frontmatter.image, baseDir)}
                alt={frontmatter.title || ""}
                width={1382}
                height={700}

                style={{ objectFit: "fill", height: "100%", width: "100%", aspectRatio: '1382 / 700' }}
              />
            </Box>
          </Link>
        ) : null}
      </Box>
      </Section>

<Section delay={0.3}>
      <Heading as="h1" size="2xl" mb={4} fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
        {frontmatter.title}
      </Heading>
      {frontmatter.description && (
        <Text fontSize="xl" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mb={4}>
          {frontmatter.description}
        </Text>
      )}

      <Text fontSize="sm" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} fontStyle="italic" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
        {frontmatter.author && `By ${frontmatter.author} `}
        {frontmatter.startedAt && frontmatter.endedAt
          ? `| ${formatDate(frontmatter.startedAt)} - ${formatDate(frontmatter.endedAt)}`
          : frontmatter.startedAt
          ? `| Started: ${formatDate(frontmatter.startedAt)}`
          : frontmatter.endedAt
          ? `| Ended: ${formatDate(frontmatter.endedAt)}`
          : ""}
      </Text>
      </Section>

<Section delay={0.4}>
      <Box mt={8}>
        <MDXRemote {...source} components={components} />
      </Box>
      </Section>
    </Container>
    
  );
}

export async function getStaticPaths() {
  const mdxDir = path.join(process.cwd(), "public", "projects");

  const walkDir = async (dir) => {
    const files = await fs.readdir(dir, { withFileTypes: true });
    let mdxFiles = [];
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        mdxFiles = mdxFiles.concat(await walkDir(fullPath));
      } else if (file.name.endsWith(".mdx")) {
        mdxFiles.push(fullPath);
      }
    }
    return mdxFiles;
  };

  const mdxFiles = await walkDir(mdxDir);
  const paths = mdxFiles.map((filePath) => {
    const relativePath = path.relative(mdxDir, filePath);
    const slug = relativePath.replace(".mdx", "").split(path.sep);
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.join(path.sep) : params.slug;
  const mdxPath = path.join(process.cwd(), "public", "projects", `${slug}.mdx`);
  const fileContent = await fs.readFile(mdxPath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);
  const source = await serialize(content, {
    mdxOptions: { remarkPlugins: [], rehypePlugins: [] },
    scope: {},
  });

  const baseDir = path.posix.dirname(`/projects/${slug}`);
  console.log(`Base directory for MDX file: ${baseDir}`);

  return {
    props: {
      source,
      frontmatter,
      baseDir,
      params,
    },
  };
}