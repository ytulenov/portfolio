import { useState, useEffect, useRef } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import {Box,Container,Text,Heading,Grid,Image,Button,Flex,useColorModeValue,} from "@chakra-ui/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Global } from "@emotion/react";
import SpinningBlock from "../components/SpinnerBlock";
import Slider from "react-slick";
import { keyframes } from "@emotion/react"; 

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const DataTable = dynamic(() => import("../components/DataTable"), { ssr: false });


const getToday = () => {
  return new Date(); 
};


const HighlightLink = ({ children, href, ...props }) => (
  <Text
    as="a"
    href={href}
    fontWeight="bold"
    _hover={{ textDecoration: "underline" }}
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

const translateYanimationUBClogo = keyframes`
  0% {
    transform: translateY(2.5rem);
  }
  100% {
    transform: translateY(4rem);
  }
`;

const translateYanimationhackerspacelogo = keyframes`
  0% {
    transform: translateY(-4.5rem);
  }
  100% {
    transform: translateY(-6rem);
  }
`;


const getCourseMDXFiles = async () => {
  const { promises: fs } = await import("fs"); 
  const path = await import("path");
  const coursesDir = path.join(process.cwd(), "public", "courses");
  const files = await fs.readdir(coursesDir, { withFileTypes: true });
  const mdxFiles = files
    .filter((file) => file.isFile() && file.name.endsWith(".mdx"))
    .map((file) => path.join(coursesDir, file.name));

  const courses = await Promise.all(
    mdxFiles.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data: frontmatter, content } = matter(fileContent);
      const source = await serialize(content);
      return { frontmatter, source, slug: path.basename(filePath, ".mdx") };
    })
  );

  return courses;
};

function DynamicBackgroundBox() {
    const [bgSize, setBgSize] = useState("170% auto"); 
    const [overlayOpacity, setOverlayOpacity] = useState(0); 
    const boxRef = useRef(null);
  
    useEffect(() => {
      let rafId = null;
  
      const handleScroll = () => {
        if (!boxRef.current) return;
  
        const rect = boxRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
  
        
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const totalHeight = rect.height;
        const visibilityRatio = Math.max(0, Math.min(1, visibleHeight / totalHeight));
  
        
        const newSize = 170 - (170 - 80) * visibilityRatio; 
        const newOpacity = 0 + (0.85 - 0) * visibilityRatio; 
  
        
        setBgSize(`${newSize}% auto`);
        setOverlayOpacity(newOpacity);
      };
  
      const scrollHandler = () => {
        
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(handleScroll);
      };
  
      
      window.addEventListener("scroll", scrollHandler);
      handleScroll(); 
  
      
      return () => {
        window.removeEventListener("scroll", scrollHandler);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, []);
  
    return (
      <Box
        ref={boxRef}
        w="100%"
        h="656px"
        borderRadius="4rem" 
        overflow="hidden" 
        position="relative" 
        display="flex" 
        flexDirection="column" 
        alignItems={{ base: "center", md: "start" }} 
        justifyContent="start" 
        px={{ base: 5, sm: 16 }} 
        py={10} 
        pb={12} 
        bgImage="url('/eduleaderbackgroundforclub.png')" 
        bgRepeat="no-repeat" 
        bgSize={bgSize} 
        bgPos={{ base: "center 10%", md: "40% 40%" }} 
        
      >
        {/* Overlay Box */}
        <Box
          position="absolute" 
          top={0} 
          left={0} 
          h="full" 
          w="full" 
          bgGradient={useColorModeValue(
            `linear(to-bl, ${process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_GRADIENT_FIRSTCOLOR_LIGHT }, ${process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_GRADIENT_SECONDCOLOR_LIGHT })`,
            `linear(to-bl, ${process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_GRADIENT_FIRSTCOLOR_DARK }, ${process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_GRADIENT_SECONDCOLOR_DARK })`
          )}
          opacity={overlayOpacity} 
          zIndex={1} 
          
        />
  
        {/* Content (above overlay) */}
        <Box position="relative" zIndex={2}>
          <Heading as="h1" size="lg" mb={2} fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT,process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
            UBC Tech Club
          </Heading>
          <Text mb={2} fontWeight="1000" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue("#4369fa", process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}>Active Member | 2022 - Present</Text>
          <Text mb={4}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT,process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
          Skills Acquired
          </Text>
        </Box>
        <Box
        position="relative"
        mt={{ base: 40, md: 10 }} 
        display="grid"
        zIndex={2}
        gridTemplateRows="repeat(2, 1fr)" 
        gridTemplateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }} 
        gap={5} 
      >
        {/* Card 1 */}
        <Box
        bg={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_DARK)} 
          borderRadius="4rem" 
          w={{ base: "10rem", md: "11rem" }} 
          h={{ base: "10rem", md: "11rem" }} 
          p="1.75rem" 
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="space-between"
        >
          <Image
            src="/light-bulb.png" 
            alt="Light Bulb"
            h={10} 
            w={10}
            objectFit="cover"
            borderRadius="md"
          />
          <Text
            color={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_DARK)} 
            fontSize={{ base: "xs", md: "sm" }} 
            letterSpacing="wide" 
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            fontWeight="1000"
          >
            Building stuff from scratch
          </Text>
        </Box>

        {/* Card 2 */}
        <Box
           bg={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_DARK)} 
          borderRadius="4rem"
          w={{ base: 40, md: 44 }}
          h={{ base: 40, md: 44 }}
          p={7}
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="space-between"
        >
          <Image
            src="/password.png" 
            alt="Example"
            h={10} 
            w={10}
            objectFit="cover"
            borderRadius="md"
          />
          <Text
            color={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_DARK)} 
            fontSize={{ base: "xs", md: "sm" }}
            letterSpacing="wide"
            fontWeight="1000"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          >
            Another Skill
          </Text>
        </Box>

        {/* Card 3 (visible on sm+) */}
        <Box
          bg={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_DARK)} 
          borderRadius="4rem"
          w={{ base: 40, md: 44 }}
          h={{ base: 40, md: 44 }}
          p={7}
          flexDirection="column"
          alignItems="start"
          justifyContent="space-between"
          display="flex"
          
        >
          <Image
            src="/palette.png" 
            alt="Example 2"
            h={10} 
            w={10}
            objectFit="cover"
            borderRadius="md"
          />
          <Text
            color={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_DARK)} 
            fontSize={{ base: "xs", md: "sm" }}
            letterSpacing="wide"
            fontWeight="1000"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          >
            Third Skill Third Skil Third Skil Third Skil 
          </Text>
        </Box>
        <Box
          bg={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_DARK)} 
          borderRadius="4rem"
          w={{ base: 40, md: 44 }}
          h={{ base: 40, md: 44 }}
          p={7}
          flexDirection="column"
          alignItems="start"
          justifyContent="space-between"
          display="flex"
          
        >
          <Image
            src="/blueprint.png" 
            alt="Example 2"
            h={10} 
            w={10}
            objectFit="cover"
            borderRadius="md"
          />
          <Text
            color={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_DARK)} 
            fontSize={{ base: "xs", md: "sm" }}
            letterSpacing="wide"
            fontWeight="1000"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          >
            Third Skill Third Skil Third Skil Third Skil 
          </Text>
        </Box>
        <Box
          bg={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_DARK)} 
          borderRadius="4rem"
          w={{ base: 40, md: 44 }}
          h={{ base: 40, md: 44 }}
          p={7}
          flexDirection="column"
          alignItems="start"
          justifyContent="space-between"
          display="flex"
          
        >
          <Image
            src="/relax.png" 
            alt="Example 2"
            h={10} 
            w={10}
            objectFit="cover"
            borderRadius="md"
          />
          <Text
            color={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_DARK)} 
            fontSize={{ base: "xs", md: "sm" }}
            letterSpacing="wide"
            fontWeight="1000"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          >
            Third Skill Third Skil Third Skil Third Skil 
          </Text>
        </Box>
        <Box
           bg={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_BGINSIDE_WITH_OPACITY_DARK)} 
          borderRadius="4rem"
          w={{ base: 40, md: 44 }}
          h={{ base: 40, md: 44 }}
          p={7}
          flexDirection="column"
          alignItems="start"
          justifyContent="space-between"
          display="flex"
          
        >
          <Image
            src="/biceps.png" 
            alt="Example 2"
            h={10} 
            w={10}
            objectFit="cover"
            borderRadius="md"
          />
          <Text
            color={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_SIXITEMS_TEXTINSIDE_DARK)} 
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="1000"
            letterSpacing="wide"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          >
            Third Skill Third Skil Third Skil Third Skil 
          </Text>
        </Box>
      </Box>
    </Box>
    );
  }

  
  


const getTranscriptData = async () => {
  try {
    const { promises: fs } = await import("fs"); 
    const path = await import("path");
    const transcriptPath = path.join(process.cwd(), "public", "Yerkin's Transcript.xlsx");
    const buffer = await fs.readFile(transcriptPath);
    const XLSX = await import("xlsx");
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName]; 
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log("Server-side parsed transcript data:", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error loading Yerkin's Transcript.xlsx:", error);
    return [["Error loading transcript data"]];
  }
};

export default function EduLeaderPage({ courses }) {
  const components = {
    h1: (props) => <Heading as="h1" size="2xl" my={6} color="inherit" fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}  {...props} />,
    h2: (props) => <Heading as="h2" size="xl" my={5} color="inherit" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}  {...props} />,
    h3: (props) => <Heading as="h3" size="lg" my={4} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}  color="inherit" {...props} />,
    h4: (props) => <Heading as="h4" size="md" my={4} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}  color="inherit" {...props} />,
    p: (props) => <Text pb={4} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}  color="inherit" {...props} />,
    strong: (props) => <Text as="strong" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}  fontWeight="bold" my={4} color="inherit" {...props} />,
    em: (props) => <Text as="em" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} fontStyle="italic" my={4} color="inherit" {...props} />,
    a: Link,
    HighlightLink,
    table: (props) => <DataTable {...props} />,
    ul: (props) => (
      <Box as="ul" pl={4} listStyleType="disc"fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}   color="inherit" {...props} />
    ),
    li: (props) => <Box as="li" mb={2} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}  color="inherit" {...props} />,
  };

  

  const generateRandomDecimal = () => (Math.random() * 100).toFixed(1);


  const generateRandomSmallInteger = () => Math.floor(Math.random() * 5) + 1;

  
  const spinningBlocks = [
    { label: "Cumulative Average", finalValue: 76.9, generateRandom: generateRandomDecimal },
    { label: "GPA", finalValue: 3.4, generateRandom: generateRandomDecimal },
    { label: "Class Average", finalValue: 71.41, generateRandom: generateRandomDecimal },
    
    { label: "Cumulative Credits Earned", finalValue: "127/145", generateRandom: () => `${Math.floor(Math.random() * 50)}/${Math.floor(Math.random() * 50) + 1}` },
    { label: "Current Year", finalValue: 4, generateRandom: generateRandomSmallInteger },
    { label: "Courses Passed", finalValue: "37/41", generateRandom: () => `${Math.floor(Math.random() * 50)}/${Math.floor(Math.random() * 50) + 1}` },
  ];

  
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
    arrows: true,
    className: "custom-slider",
  };

  const startDate = new Date("2021-09-01");
  const endDate = new Date("2025-06-05");
  const today = getToday();
  const totalDurationMs = endDate - startDate;
  const elapsedMs = today - startDate;
  const progressPercentage = (elapsedMs / totalDurationMs) * 100;
  const [selectedCourse, setSelectedCourse] = useState(courses[0] || null);
const [isOpen, setIsOpen] = useState(false);

const dotColor = useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK); 
  const activeDotColor = useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK); 
  return (
    <>
        {/* Inject global styles for the slider dots */}
        <Global
          styles={`
            .custom-slider .slick-dots li button:before {
              color: ${dotColor};
              font-size: 12px;
              opacity: 0.5;
            }
            .custom-slider .slick-dots li.slick-active button:before {
              color: ${activeDotColor};
              opacity: 1;
            }
          `}
        />
    <Container maxW="80%" pb={0} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}> {/* Changed pb={20} to pb={0} */}
      {/* Carousel Before the Heading */}
      <Box
          mb={4}
          width={{ base: "100%", md: "1400px" }} 
          maxW="100%"
          height="700px"
          mx="auto"
          mt={{ base: -10, md: -14 }}
        >
          <Slider {...carouselSettings}>
            <div>
              <img
                src="/ubc.jpg"
                alt="UBC Campus 1"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/ubc1.jpg"
                alt="UBC Campus 2"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/ubc2.jpg"
                alt="UBC Campus 2"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/ubc3.jpg"
                alt="UBC Campus 2"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/ubc4.jpg"
                alt="UBC Campus 2"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/ubc5.webp"
                alt="UBC Campus 2"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/ubc6.jpg"
                alt="UBC Campus 2"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/ubc7.png"
                alt="UBC Campus 2"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/ubc8.jpg"
                alt="UBC Campus 2"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
          </Slider>
        </Box>

      {/* Education & Leadership Heading */}
      <Heading  as="h1"
      size="4xl"
      textTransform="uppercase"
      letterSpacing="wide"
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      lineHeight="1.1" textAlign="center" mb={14}>
        Education & Leadership
      </Heading>

      {/* UBC Section */}
      <Box >
      <Flex
  justifyContent={{ base: "center", md: "space-between" }} 
  alignItems="center"
  direction={{ base: "column", md: "row" }} 
  maxW="100%" 
>
  <Box
    flex="1"
    pr={{ base: 0, md: 4 }} 
    mb={{ base: 4, md: 0 }} 
    maxW={{ base: "100%", md: "80%" }} 
  >
    <Heading
      as="h1"
      fontSize="3xl"
      mb={6}
      
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
      color={useColorModeValue(
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
      )}
    >
      UBC
    </Heading>
    <Text
      mb={4}
      fontSize="md"
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
      color={useColorModeValue(
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
      )}
    >
      I am currently pursuing a Bachelor of Applied Science in Electrical Engineering at the University of British Columbia (UBC), and in my fourth year, I’m diving into some fascinating areas of the field. I’m exploring power electronics, focusing on efficient energy management in systems, and modern control techniques, which help optimize how devices and processes function. I’m also delving into applied machine learning, looking at how it can tackle complex engineering challenges. My capstone design project ties it all together, letting me apply sustainable design principles, circuit analysis, and system dynamics to create a practical solution. This builds on a solid base from earlier years—things like electricity, magnetism, and computational tools—and it’s giving me the skills to make a real impact in electrical engineering
    </Text>
  </Box>
  <Box
    flexShrink={0}
    position="relative"
    height="22rem"
    perspective="800px"
    sx={{ perspective: "800px" }}
    display="flex"
    flexDirection="column"
    alignItems="center"
    ml={{ base: 0, md: "auto" }} 
    mr={{ base: 0, md: -10 }} 
  >
    <Image
      src="/ubclogo.png"
      alt="UBC Logo"
      height={{ base: "10rem", xl: "16rem" }}
      sx={{
        animation: `${translateYanimationUBClogo} 5s ease-in-out infinite alternate`,
        transform: "rotateX(50deg)",
      }}
    />
    <Text
      fontFamily={process.env.NEXT_PUBLIC_UBC_MOTTO_FONT}
      fontSize="2xl"
      fontWeight="bold"
      color={useColorModeValue(
        process.env.NEXT_PUBLIC_UBC_MOTTO_COLOR_LIGHT,
        process.env.NEXT_PUBLIC_UBC_MOTTO_COLOR_DARK
      )}
      textShadow={useColorModeValue(
        process.env.NEXT_PUBLIC_UBC_MOTTO_TEXT_SHADOW_LIGHT,
        process.env.NEXT_PUBLIC_UBC_MOTTO_TEXT_SHADOW_DARK
      )}
      mt={10}
      sx={{ letterSpacing: "2px" }}
    >
      Tuum Est
    </Text>
  </Box>
</Flex>

        {/* Timeline */}
        <Box textAlign="center" mb={12}>
          <Heading fontSize="3xl" pb={5} as="h1" textAlign="center" fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
            TIMELINE
          </Heading>
          <Box position="relative" height="80px" >
            <Box
              position="absolute"
              top="70%"
              left="0"
              width="100%"
              height="2px"
              transform="translateY(-50%)"
            >
              <Box
                position="absolute"
                top="0"
                left="0"
                width={`${progressPercentage}%`}
                height="100%"
                bg={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_TIMELINE_GREEN_COLOR_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_TIMELINE_GREEN_COLOR_DARK)}
                zIndex={1}
              />
              <Box
                position="absolute"
                top="0"
                left={`${progressPercentage}%`}
                width={`${100 - progressPercentage}%`}
                height="100%"
                bg={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_TIMELINE_RED_COLOR_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_TIMELINE_RED_COLOR_DARK)}
                zIndex={1}
              />
            </Box>
            <Flex justifyContent="space-between" alignItems="center" position="relative" zIndex={3}>
              <Box textAlign="center">
                <Text fontSize="sm" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>Start</Text>
                <Text fontSize="md" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} fontWeight="bold" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>Sep 1, 2021</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="sm"fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>Today</Text>
                <Text fontSize="lg" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} fontWeight="bold" color={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_TIMELINE_GREEN_COLOR_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_TIMELINE_GREEN_COLOR_DARK)}>
                  {formatDate(getToday())}
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="sm" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>End</Text>
                <Text fontSize="md" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} fontWeight="bold" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>Jun 5, 2025</Text>
              </Box>
            </Flex>
            <Box
              position="absolute"
              top="70%"
              left={`${progressPercentage}%`}
              transform="translate(-50%, -50%)"
              width="15px"
              height="15px"
              bg={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_TIMELINE_GREEN_COLOR_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_TIMELINE_GREEN_COLOR_DARK)}
              borderRadius="50%"
              zIndex={4}
              boxShadow={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_TIMELINE_GREEN_COLOR_BOXSHADOW_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_TIMELINE_GREEN_COLOR_BOXSHADOW_DARK)}
            />
          </Box>
        </Box>

        {/* Spinning Blocks */}
        <Box mb={40}>
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            {spinningBlocks.map((block, index) => (
              <Box key={index} textAlign="center">
                <SpinningBlock {...block} />
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Transcript */}
        <Box mb={40}>
          <Heading as="h1" fontSize="3xl" pb={8} textAlign="center"  mt={8} fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
            TRANSCRIPT
          </Heading>
          <DataTable src="/Yerkin's Transcript.xlsx" />
          <Box textAlign="center" mt={6}>
          <Button
      as={Link}
      href="/Yerkin's Transcript.xlsx"
      download="Yerkin's Transcript.xlsx" 
      fontSize="18px"
      variant="solid"
      _hover={{
        bg: useColorModeValue(
          process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
          process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
        ),}}
        color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
               fontWeight="bold" borderRadius='md' fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}  bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
    >
      Download Transcript
    </Button>
  </Box>
        </Box>

        {/* Courses */}
        <Box mb={40} minH="600px">
            <Heading
              as="h1"
              fontSize="3xl"
              mb={8}
              textAlign="center"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
              color={useColorModeValue(
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
              )}
            >
              COURSES
            </Heading>
            <Flex
              w="100%"
              maxW="1526px" 
              h="780px"
              bg={useColorModeValue(
                process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
                process.env.NEXT_PUBLIC_OVERALL_BG_DARK
              )}
              borderRadius="3xl"
              direction="row"
            >
              <Box
                w={{ base: "100%", md: "361px" }} 
                h="full"
                bg={useColorModeValue(
                  process.env.NEXT_PUBLIC_EDULEADER_COURSE_SELECTION_BACKGROUND_NOTSELECTED_LIGHT,
                  process.env.NEXT_PUBLIC_EDULEADER_COURSE_SELECTION_BACKGROUND_NOTSELECTED_DARK
                )}
                display="flex"
                flexDirection="column"
                overflowY="auto"
                borderTopLeftRadius="2xl"
                borderBottomLeftRadius={{ base: 0, md: "2xl" }}
              >
                {courses.map((courseItem, index) => (
                  <Box
                    key={index}
                    h="144px"
                    display="flex"
                    alignItems="center"
                    p={6}
                    borderBottom="2px"
                    borderColor={useColorModeValue(
                      process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
                      process.env.NEXT_PUBLIC_OVERALL_BG_DARK
                    )}
                    bgGradient={
                      selectedCourse && selectedCourse.slug === courseItem.slug
                        ? useColorModeValue(
                            `linear(to-bl, ${process.env.NEXT_PUBLIC_EDULEADER_COURSE_BGGRADIENT_FIRSTCOLOR_PLUS_HOVER_LIGHT}, ${process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT})`,
                            `linear(to-bl, ${process.env.NEXT_PUBLIC_EDULEADER_COURSE_BGGRADIENT_FIRSTCOLOR_PLUS_HOVER_DARK}, ${process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK})`
                          )
                        : undefined
                    }
                    bg={
                      selectedCourse && selectedCourse.slug === courseItem.slug
                        ? undefined
                        : "transparent"
                    }
                    color={
                      selectedCourse && selectedCourse.slug === courseItem.slug
                        ? useColorModeValue(
                            process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
                            process.env.NEXT_PUBLIC_OVERALL_BG_DARK
                          )
                        : useColorModeValue(
                            process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                            process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
                          )
                    }
                    _hover={
                      selectedCourse && selectedCourse.slug === courseItem.slug
                        ? {}
                        : {
                            bgGradient: useColorModeValue(
                              `linear(to-bl, ${process.env.NEXT_PUBLIC_EDULEADER_COURSE_BGGRADIENT_FIRSTCOLOR_PLUS_HOVER_LIGHT}, ${process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT})`,
                              `linear(to-bl, ${process.env.NEXT_PUBLIC_EDULEADER_COURSE_BGGRADIENT_FIRSTCOLOR_PLUS_HOVER_DARK}, ${process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK})`
                            ),
                            color: useColorModeValue(
                              process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
                              process.env.NEXT_PUBLIC_OVERALL_BG_DARK
                            ),
                          }
                    }
                    cursor="pointer"
                    onClick={() => setSelectedCourse(courseItem)}
                    transition="background 0.3s ease"
                    position="relative"
                  >
                    {selectedCourse && selectedCourse.slug === courseItem.slug && (
                      <Box
                        position="absolute"
                        left="0"
                        top="0"
                        bottom="0"
                        w="2px"
                        bg={useColorModeValue(
                          process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_LIGHT,
                          process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_DARK
                        )}
                        zIndex={1}
                      />
                    )}
                    <Image
                      src={`/courses/${courseItem.slug}.png`}
                      h={{ base: 12, xl: 16 }}
                      w={{ base: 12, xl: 16 }}
                      borderRadius="xl"
                      alt={`${courseItem.frontmatter.title} Logo`}
                    />
                    <Text
                      ml={6}
                      fontSize="lg"
                      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                      letterSpacing="wide"
                      color="inherit"
                      fontWeight="medium"
                    >
                      {courseItem.frontmatter.title}
                    </Text>
                  </Box>
                ))}
              </Box>
              <Box
                w="3px"
                h="full"
                bg={useColorModeValue(
                  process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
                  process.env.NEXT_PUBLIC_OVERALL_BG_DARK
                )}
                display={{ base: "none", md: "block" }} 
              />
              <Box
                flex="1"
                h="full"
                bgGradient={useColorModeValue(
                  `linear(to-bl, ${process.env.NEXT_PUBLIC_EDULEADER_COURSE_BGGRADIENT_FIRSTCOLOR_PLUS_HOVER_LIGHT}, ${process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT})`,
                  `linear(to-bl, ${process.env.NEXT_PUBLIC_EDULEADER_COURSE_BGGRADIENT_FIRSTCOLOR_PLUS_HOVER_DARK}, ${process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK})`
                )}
                borderTopRightRadius="2xl"
                borderBottomRightRadius="2xl"
              >
                <Box h="full" overflowY="auto" p={6}>
                  {selectedCourse && (
                    <Box>
                      <Box
                        mb={6}
                        borderLeft="2px"
                        borderColor={useColorModeValue(
                          process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_LIGHT,
                          process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_DARK
                        )}
                      >
                        <Box position="relative" pl={4}>
                          <Box
                            position="absolute"
                            left="-7px"
                            top="12px"
                            w="12px"
                            h="12px"
                            bg={useColorModeValue(
                              process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_LIGHT,
                              process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_DARK
                            )}
                            border="2px"
                            borderColor={useColorModeValue(
                              process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_LIGHT,
                              process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_DARK
                            )}
                            borderRadius="full"
                          />
                          <Text
                            fontWeight="bold"
                            fontSize="lg"
                            fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
                            letterSpacing="wide"
                            color={useColorModeValue(
                              process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_LIGHT,
                              process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_DARK
                            )}
                          >
                            {selectedCourse.frontmatter.title}
                          </Text>
                          <Text
                            fontSize="lg"
                            letterSpacing="wide"
                            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                            color={useColorModeValue(
                              process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_LIGHT,
                              process.env.NEXT_PUBLIC_EDULEADER_COURSE_LEFTLINE_TIMEPERIOD_BRIGHTCOLOR_DARK
                            )}
                          >
                            {`${formatDate(selectedCourse.frontmatter.startedAt)} - ${
                              selectedCourse.frontmatter.endedAt
                                ? formatDate(selectedCourse.frontmatter.endedAt)
                                : "Present"
                            }`}
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        color={useColorModeValue(
                          process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
                          process.env.NEXT_PUBLIC_OVERALL_BG_DARK
                        )}
                        fontSize={{ base: "md", md: "lg" }}
                        letterSpacing="wide"
                        lineHeight="relaxed"
                        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                        pr={2}
                        pl={2}
                      >
                        <MDXRemote {...selectedCourse.source} components={components} />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Flex>
          </Box>

        {/* Clubs */}
        <Box> {/* No mb here to ensure no padding after Clubs */}
          <Heading as="h1" fontSize="3xl"   mb={6} fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
            CLUBS & LEADERSHIP
          </Heading>
          <Flex direction={{ base: "column", md: "row" }} align="start" gap={8}>
            <Box flex="1">
              <Text fontSize="md" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
                As the Webmaster Executive for the IEEE UBCO Student Branch... As the Webmaster Executive for the IEEE UBCO Student Branch... As the Webmaster Executive for the IEEE UBCO Student Branch... As the Webmaster Executive for the IEEE UBCO Student Branch...
              </Text>
            </Box>
            <Box
              flexShrink={0}
              position="relative"
              height="12rem"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Image
                src={useColorModeValue("/hackerspacelogolight.png", "/hackerspacelogodark.png")}
                alt="UBC Logo"
                height="16rem"
                sx={{
                  animation: `${translateYanimationhackerspacelogo} 5s ease-in-out infinite alternate`,
                }}
              />
            </Box>
          </Flex>
          <Flex direction="column" align="center" mb={4}>
            <DynamicBackgroundBox />
          </Flex>
          <Flex wrap="wrap" justify="center" gap={4}>
            <Button
              as={Link}
              href="/projects/project1"
             fontWeight="bold" borderRadius='md' fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}   fontSize="18px"
     
              color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
            
              bg={useColorModeValue(
                `linear-gradient(315deg, ${process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT} 0%, ${process.env.NEXT_PUBLIC_BUTTON_BG_GRADIENT_SECONDCOLOR_LIGHT} 100%)`,
                `linear-gradient(315deg, ${process.env.NEXT_PUBLIC_BUTTON_BG_DARK} 0%, ${process.env.NEXT_PUBLIC_BUTTON_BG_GRADIENT_SECONDCOLOR_DARK} 100%)`
              )}
              _hover={{
                transform: "translateY(-6px)",
                bg: useColorModeValue(
                  `linear-gradient(315deg, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT} 0%, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_GRADIENT_SECONDCOLOR_LIGHT} 100%)`,
                  `linear-gradient(315deg, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK} 0%, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_GRADIENT_SECONDCOLOR_DARK} 100%)`
                ),
              }}
              
              boxShadow={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_LASTBUTTONS_TEXTSHADOW_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_LASTBUTTONS_TEXTSHADOW_DARK)}
              transition="all 0.3s ease-in-out"
            >
              Project 1 →
            </Button>
            <Button
              as={Link}
              href="/projects/project2"
               fontWeight="bold" borderRadius='md' fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}   fontSize="18px"
              color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
           
                bg={useColorModeValue(
                  `linear-gradient(315deg, ${process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT} 0%, ${process.env.NEXT_PUBLIC_BUTTON_BG_GRADIENT_SECONDCOLOR_LIGHT} 100%)`,
                  `linear-gradient(315deg, ${process.env.NEXT_PUBLIC_BUTTON_BG_DARK} 0%, ${process.env.NEXT_PUBLIC_BUTTON_BG_GRADIENT_SECONDCOLOR_DARK} 100%)`
                )}
                
                _hover={{
                  transform: "translateY(-6px)",
                  bg: useColorModeValue(
                    `linear-gradient(315deg, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT} 0%, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_GRADIENT_SECONDCOLOR_LIGHT} 100%)`,
                    `linear-gradient(315deg, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK} 0%, ${process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_GRADIENT_SECONDCOLOR_DARK} 100%)`
                  ),
                }}
  
              boxShadow={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_LASTBUTTONS_TEXTSHADOW_LIGHT, process.env.NEXT_PUBLIC_EDULEADER_CLUB_LASTBUTTONS_TEXTSHADOW_DARK)}
              transition="all 0.3s ease-in-out"
            >
              Project 2 →
            </Button>
          </Flex>
        </Box>
      </Box>
    </Container></>
  );
}

export async function getStaticProps() {
  const courses = await getCourseMDXFiles();

  
  const sortedCourses = courses.sort((a, b) => {
    const dateA = a.frontmatter.endedAt ? new Date(a.frontmatter.endedAt) : null;
    const dateB = b.frontmatter.endedAt ? new Date(b.frontmatter.endedAt) : null;

    
    if (!dateA && !dateB) return 0;

    
    if (!dateA) return 1;

    
    if (!dateB) return -1;

    
    return dateB - dateA;
  });

  await getTranscriptData(); 

  return {
    props: {
      courses: sortedCourses,
    },
  };
}