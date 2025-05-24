import { useState, useEffect, useRef } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import { FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import {Box,Container,Text,Heading,Grid,Image,Button,Flex,useColorModeValue,IconButton} from "@chakra-ui/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Global } from "@emotion/react";
import SpinningBlock from "../components/SpinnerBlock";
import Slider from "react-slick";
import { keyframes } from "@emotion/react"; 
import Section from "../components/section"; // Import Section component
import { parse, format } from "date-fns";

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
  if (!dateString || typeof dateString !== "string") return "";
  try {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return format(date, "MMMM d, yyyy");
  } catch (error) {
    console.error(`Invalid date format for: ${dateString}`, error);
    return "";
  }
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
    transform: translateY(-1rem);
  }
  100% {
    transform: translateY(-3rem);
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
    const iconSize = "2xl";
  const customIconSize = "24px";
  
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
        bgImage={useColorModeValue("url('/eduleader/eduleaderbackgroundforclublight.png')","url('/eduleader/eduleaderbackgroundforclub.png')")}
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
        <Box position="relative" zIndex={2} w="100%">
  <Flex justifyContent="space-between" alignItems="center" w="100%">
    <Link href="https://linktr.ee/ubcoieee" target="_blank" rel="noopener noreferrer">
    <Heading as="h1" size="lg" mb={2}     _hover={{ textDecoration: "underline", cursor: "pointer" }}
 fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
      IEEE UBC Okanagan Student Branch
    </Heading>
    </Link>
    <Flex gap={4}>
       <IconButton
            as={Link}
            href="https://www.linkedin.com/company/ieee-okanagan-student-chapter/"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize={customIconSize} />}
            size={iconSize}
            variant="ghost"
color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}            _hover={{ opacity: 1 }}
            isExternal
          />
      <IconButton
            as={Link}
            href="https://www.instagram.com/ubcoieee/"
            aria-label="LinkedIn"
            icon={<FaSquareInstagram fontSize={customIconSize} />}
            size={iconSize}
            variant="ghost"
color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}            _hover={{ opacity: 1 }}
            isExternal
          />
      <IconButton
            as={Link}
            href="https://linktr.ee/ubcoieee"
            aria-label="LinkedIn"
            icon={<FaGlobe fontSize={customIconSize} />}
            size={iconSize}
            variant="ghost"
color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}            _hover={{ opacity: 1 }}
            isExternal
          />
          <IconButton
            as={Link}
            href="mailto:mlrc.hackerspace@gmail.com"
            aria-label="LinkedIn"
            icon={<FaEnvelope fontSize={customIconSize} />}
            size={iconSize}
            variant="ghost"
color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}            _hover={{ opacity: 1 }}
            isExternal
          />
    </Flex>
  </Flex>
  <Text mb={2} fontWeight="1000" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_EDULEADER_CLUB_DYNAMIC_BG_DATECOLOR_INSIDE_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}>
    Past Member | 2023 - 2025
  </Text>
  <Text mb={4} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
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
            src="/eduleader/code.png" 
            alt="Full-Stack Development"
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
Built scalable platforms using Next.js & APIs          </Text>
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
            src="/eduleader/database.png" 
            alt="Database Management"
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
Maintained automated databases         </Text>
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
            src="/eduleader/payment.png" 
            alt="Online Payment"
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
Integrated Stripe for secure payment systems          </Text>
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
            src="/eduleader/bugs.png" 
            alt="Bugs resolution"
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
Resolved 1,000+ bugs for smooth UX          </Text>
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
            src="/eduleader/biceps.png" 
            alt="PCB"
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
            Designed & led hands-on PCB workshops
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
            src="/eduleader/ux.png" 
            alt="UX"
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
Enhanced UX based on user feedback
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
    { label: "Cumulative Average", finalValue: 77.7, generateRandom: generateRandomDecimal },
    { label: "GPA", finalValue: 3.47, generateRandom: generateRandomDecimal },
    { label: "School Average", finalValue: 71.41, generateRandom: generateRandomDecimal }, // average for first 3 years. the way you calculate is (4*(63.72)+3(72.69+80.24+72.65+61.29+72.89+63.01+69.01+69.64+70.88+77.3+71.7+64.7+81+76+73.7+74+79.3+72+70.3+59.2+66.8+77.8+81.4+68.2+76.6+67.7+68.5+72.5+77.5+67.7+65.9+75.2+69.5))/(4+3(9+12+12)) по нарастающей. первый курс APSC 169, потом APSC 171 до ENGR 378
    { label: "Cumulative Credits Earned", finalValue: "148/148", generateRandom: () => `${Math.floor(Math.random() * 50)}/${Math.floor(Math.random() * 50) + 1}` },
    { label: "Status", finalValue: "completed", generateRandom: () => `${Math.floor(Math.random() * 50)}/${Math.floor(Math.random() * 50) + 1}` },
    { label: "Courses Passed", finalValue: "41/41", generateRandom: () => `${Math.floor(Math.random() * 50)}/${Math.floor(Math.random() * 50) + 1}` },
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
  const endDate = new Date("2025-04-30");
  const today = getToday();
  const totalDurationMs = endDate - startDate;
  const elapsedMs = today - startDate;
  const progressPercentage = (elapsedMs / totalDurationMs) * 100;
  const [selectedCourse, setSelectedCourse] = useState(courses[0] || null);
const [isOpen, setIsOpen] = useState(false);
 const arrowColor = useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK);
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
               .custom-slider .slick-prev:before, .custom-slider .slick-next:before {
            color: ${arrowColor};
            font-size: 20px; /* Increase size for visibility */
            opacity: 1; /* Full opacity */
          }
          `}
        />
    <Container maxW="80%" pb={0} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}> {/* Changed pb={20} to pb={0} */}
      {/* Carousel Before the Heading */}
      <Section delay={0.1}>
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
                src="/eduleader/ubc.jpg"
                alt="UBC Campus 1"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/eduleader/ubc1.jpg"
                alt="UBC Campus 2"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/eduleader/ubc2.jpg"
                alt="UBC Campus 3"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/eduleader/ubc3.jpg"
                alt="UBC Campus 4"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/eduleader/ubc4.jpg"
                alt="UBC Campus 5"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/eduleader/ubc5.webp"
                alt="UBC Campus 6"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/eduleader/ubc6.jpg"
                alt="UBC Campus 7"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/eduleader/ubc7.png"
                alt="UBC Campus 8"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <div>
              <img
                src="/eduleader/ubc8.jpg"
                alt="UBC Campus 9"
                style={{ width: "100%", height: "650px", objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
          </Slider>
        </Box>
        </Section>

<Section delay={0.2}>
      {/* Education & Leadership Heading */}
      <Heading  as="h1"
      size="4xl"
      textTransform="uppercase"
      letterSpacing="wide"
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      lineHeight="1.1" textAlign="center" mb={14}>
        Education & Leadership
      </Heading>
      </Section>

<Section delay={0.3}>
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
I recently completed my Bachelor of Applied Science in Electrical Engineering at the University of British Columbia (UBC). In my final year, I had been diving into some fascinating areas of the field. I explored power electronics, focusing on efficient energy management in systems, and modern control techniques, which help optimize how devices and processes function. I also have been delving into applied machine learning, looking at how it can tackle complex engineering challenges. My capstone design project tied it together, letting me apply sustainable design principles, circuit analysis, and system dynamics to create a practical solution. This was built on a solid base from earlier years—things like electricity, magnetism, and computational tools—and it gave me the skills to make a real impact in electrical engineering    </Text>
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
         <Link href="https://ok.ubc.ca" passHref legacyBehavior>
    <Image
      src="/eduleader/ubclogo.png"
      alt="UBC Logo"
      height={{ base: "10rem", xl: "16rem" }}
       _hover={{
                opacity: 0.7,
        cursor: "pointer",
      }}
      sx={{
        animation: `${translateYanimationUBClogo} 5s ease-in-out infinite alternate`,
        transform: "rotateX(50deg)",
      }}
    />
    </Link>
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
            EDUCATION TIMELINE
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
                {format(today, "MMMM d, yyyy")}
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="sm" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>End</Text>
                <Text fontSize="md" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} fontWeight="bold" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>Apr 30, 2025</Text>
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
          <DataTable src="/files/Yerkin's Transcript.xlsx" />
          <Box textAlign="center" mt={6}>
          <Button
      as={Link}
      href="/files/Yerkin's Transcript.xlsx"
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
              <Text fontSize="md" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mb={8}>
As the Webmaster Executive for the IEEE UBCO Student Branch, I managed an e-commerce platform called The Hackerspace Store providing electrical components to engineering students. Built with Next.js, the platform integrated APIs, Stripe for payments, and an automatically maintained database. During the six-month development process, my teammates and I resolved around 1,000 bugs, ensuring a seamless user experience before launch. After deployment, I continuously received feedback from users, addressing bugs and implementing improvements to enhance the platform. The store became a key resource for course projects, providing reliable and immediate access to essential components.

I also designed and led the club’s annual PCB workshop, aimed at beginners. Participants worked with a general-purpose PCB I created, featuring USB-C power, UART, SPI, I2C connections, and an STM32 chip. The workshop demonstrated programming a PID controller with temperature sensors but allowed flexibility for other applications, encouraging exploration and innovation.              </Text>
            </Box>
               <Link href="https://linktr.ee/ubcoieee" passHref legacyBehavior>
            <Box
              flexShrink={0}
              position="relative"
              height="12rem"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Image
                src={useColorModeValue("/eduleader/hackerspacelogolight.png", "/eduleader/hackerspacelogodark.png")}
                alt="IEEE UBC Okanagan Student Branch Logo"
                height="16rem"
                 _hover={{
                opacity: 0.7,
        cursor: "pointer",
      }}
                sx={{
                  animation: `${translateYanimationhackerspacelogo} 5s ease-in-out infinite alternate`,
                }}
              />
            </Box>
            </Link>
          </Flex>
          <Flex direction="column" align="center" mb={4}>
            <DynamicBackgroundBox />
          </Flex>
          <Flex wrap="wrap" justify="center" gap={4}>
            <Button
              as={Link}
              href="/projects/hackerspacestore"
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
              Hackerspace Store →
            </Button>
            {/*<Button
              as={Link}
              href="/projects/hackerspacestore"
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
              Admin CMS →
            </Button>
            <Button
              as={Link}
              href="/projects/hackerspacestore"
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
              Client-Side →
            </Button>*/}
            <Button
              as={Link}
              href="/projects/pcbworkshop"
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
              PCB Workshop →
            </Button>
          </Flex>
        </Box>
      </Box>
      </Section>
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