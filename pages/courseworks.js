import { Box, Text, Heading, Flex, Image, useColorModeValue } from "@chakra-ui/react";

import Slider from "react-slick";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Global } from "@emotion/react";
import Icon1 from "../public/icons/abstract-1.svg";
import Icon2 from "../public/icons/abstract-2.svg";
import Icon3 from "../public/icons/abstract-3.svg";
import Icon4 from "../public/icons/abstract-4.svg";
import Icon5 from "../public/icons/abstract-5.svg";
import Icon6 from "../public/icons/abstract-6.svg";
import Icon7 from "../public/icons/abstract-7.svg";
import Icon8 from "../public/icons/abstract-8.svg";
import Icon9 from "../public/icons/abstract-9.svg";
import Icon10 from "../public/icons/abstract-10.svg";
import Icon11 from "../public/icons/abstract-11.svg";
import Icon12 from "../public/icons/abstract-12.svg";
import Icon13 from "../public/icons/abstract-13.svg";
import Icon14 from "../public/icons/abstract-14.svg";
import Icon15 from "../public/icons/abstract-15.svg";
import Icon16 from "../public/icons/abstract-16.svg";
import Icon17 from "../public/icons/abstract-17.svg";
import Icon18 from "../public/icons/abstract-18.svg";
import Icon19 from "../public/icons/abstract-19.svg";
import Icon20 from "../public/icons/abstract-20.svg";

const CourseworkCard = ({ title, summary, slug, year, index }) => {
  const lightCardColors = (process.env.NEXT_PUBLIC_COURSEWORKS_COURSECARD_MULTIPLECOLORSELECTION_LIGHT).split(",");
  const darkCardColors = (process.env.NEXT_PUBLIC_COURSEWORKS_COURSECARD_MULTIPLECOLORSELECTION_DARK).split(",");

  const cardColors = useColorModeValue(lightCardColors, darkCardColors);
  
  const icons = [
    Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8, Icon9, Icon10,
    Icon11, Icon12, Icon13, Icon14, Icon15, Icon16, Icon17, Icon18, Icon19, Icon20,
  ];
  
  let colorIndex, iconIndex;
  switch (year) {
    case 4:
      colorIndex = index % 20; 
      iconIndex = index % 20;  
      break;
    case 3:
      colorIndex = (4 + index) % 20; 
      iconIndex = (4 + index) % 20;  
      break;
    case 2:
      colorIndex = (9 + index) % 20; 
      iconIndex = (9 + index) % 20;  
      break;
    case 1:
      colorIndex = (14 + index) % 20; 
      iconIndex = (14 + index) % 20;  
      break;
    default:
      colorIndex = index % 20;
      iconIndex = index % 20;
  }

  const bgColor = cardColors[colorIndex]

  const iconColor = useColorModeValue(
    process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT,
    process.env.NEXT_PUBLIC_OVERALL_BG_DARK
  );

  const IconComponent = icons[iconIndex]; 

  
  const formattedNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
 
  return (
    <Link href={`/courseworks/${slug}`} passHref legacyBehavior>
      <Box
        as="a"
        bg={bgColor}
        borderRadius="20px" 
        w={{ base: "100%", md: "360px" }} 
        h="545px" 
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
        boxShadow="md"
        
        p={6} 
        transition="transform 0.3s ease" 
        _hover={{
          "& .title-container": {
            top: "55%", 
            transform: "translateY(-50%)",
          },
          "& .summary-container": {
            opacity: 1,
            transform: "translateY(0)",
          },
          "& .read-more-button": {
            opacity: 1,
            transform: "translateY(0)",
          },
        }}
      >
        {/* Icon in top-left */}
        <Box position="absolute" top={10} left={10}>
   
          <IconComponent width={50} height={50} fill={iconColor} />
   
        </Box>

        {/* Title and Number (number above title, moves up on hover) */}
        <Box 
          className="title-container"
          position="absolute"
          top="60%" 
          transf3rm="translateY(-50%)" 
          transition="all 0.3s ease" 
          display="flex"
          flexDirection="column" 
          alignItems="left"
          justifyContent="center"
          w="100%"
        >
          {/* Number above */}
          <Text
            fontSize="4xl"
            fontWeight="bold"
           color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            ml={10}
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            mb={2} 
          >
            {`${formattedNumber}.`}
          </Text>

          {/* Title below number, with Read More button on the right */}
          <Box
            display="flex"
            alignItems="left"
        
            w="100%"
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
             color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
              lineHeight="1.2"
              ml={10}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
              maxW="200px" 
              
            >
              {title}
            </Text>

            {/* Read More Button on the right (hidden by default) */}
            <Box
              className="read-more-button"
              opacity={0}
              transform="translateY(-10px)"
              transition="opacity 0.3s ease, transform 0.3s ease"
              ml={4} 
            >
              <Box
                w="60px"
                h="60px"
                borderRadius="full"
                border="2px solid"
                borderColor={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="2xl" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}>
                  →
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Summary and Horizontal Line (hidden by default) */}
        <Box
          className="summary-container"
          
          position="absolute"
          top="70%" 
          opacity={0}
          w={{ base: "90%", md: "275px" }} 
          
          transform="translateY(10px)"
          transition="opacity 0.3s ease, transform 0.3s ease"
        >  
          <Box borderBottom="2px solid" borderColor={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)} mb={4} textAlign="center" mx="auto" />
          <Text
            fontSize="md"
           color={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            lineHeight="1.5"
            textAlign="left"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            
          >
            {summary || "No summary available"}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};


export default function Courseworks({ courseworkByYear }) {
  const baseSliderSettings = {
    dots: true,
    speed: 500,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
    centerPadding: "0px",
    arrows: true, 
    initialSlide: 2, 
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 3 } }, 
      { breakpoint: 1210, settings: { slidesToShow: 2 } }, 
      { breakpoint: 800, settings: { slidesToShow: 1 } },  
    ],
    className: "custom-slider",
  };

  const years = [4, 3, 2, 1]; 
  const dotColor = useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK); 
  const activeDotColor = useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK); 
  const arrowColor = useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK);
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
             .custom-slider .slick-slider {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .custom-slider .slick-list {
            overflow: hidden; /* Allow cards to be fully visible */
            width: 100%;
          }
          .custom-slider .slick-track {
            display: flex;
            align-items: center; /* Vertically center cards */
            justify-content: center; /* Horizontally center cards */
          }
          .custom-slider .slick-slide {
            display: flex !important;
            justify-content: center !important; /* Center each slide */
            float: none !important; /* Override slick float */
          }
      `}
    />
    <Box
      minH="100vh"
      color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      pb={16}
      mt={{ base: -10, md: -14 }}
      px={{ base: 4, md: 8 }}
      position="relative"
    >
      <Box textAlign="center" mb={16}>
        <Heading
          as="h1"
          size="4xl"
          textTransform="uppercase"
          letterSpacing="wide"
          lineHeight="1.1"
          fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
        >
          Coursework Through the Years
        </Heading>
        <Text fontSize="lg" mt={4} maxW="600px" mx="auto" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
          Explore my academic journey with projects from each year of college.
        </Text>
      </Box>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        gap={{ base: 6, md: 12 }}
        mb={20}
        px={{ base: 4, md: 0 }}
      >
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
            4 Years Covered
          </Text>
          <Text fontSize="sm" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mt={2} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
            From freshman to senior year
          </Text>
          <Box w="60px" h="2px" bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mx="auto" mt={3} />
        </Box>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
            10+ Projects
          </Text>
          <Text fontSize="sm" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mt={2} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
            Spanning multiple disciplines
          </Text>
          <Box w="60px" h="2px" bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mx="auto" mt={3} />
        </Box>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
            Data-Driven Insights
          </Text>
          <Text fontSize="sm" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mt={2} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
            Powered by charts and analytics
          </Text>
          <Box w="60px" h="2px" bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mx="auto" mt={3} />
        </Box>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
            Creative Analysis
          </Text>
          <Text fontSize="sm" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mt={2} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
            Blending art and science
          </Text>
          <Box w="60px" h="2px" bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} mx="auto" mt={3} />
        </Box>
      </Flex>

      {years.map((year) => {
        const numItems = courseworkByYear[year]?.length || 0;
        const sliderSettings = {
          ...baseSliderSettings,
          infinite: numItems > 4,
          slidesToShow: Math.min(numItems, 4),
          autoplay: numItems > 4,
        };

        return (
          <Box key={year} mb={8} position="relative" px={4}>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              mb={4}
              textAlign="center"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
              color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
            >
              {`${year}${year === 1 ? "st" : year === 2 ? "nd" : year === 3 ? "rd" : "th"} Year Coursework`}
            </Text>
            {courseworkByYear[year] && courseworkByYear[year].length > 0 ? (
  <Box
    mx="auto"
    overflow="visible"
    position="relative"
    alignItems="center"
    w="100%"
    maxW="1800px"
    
    minHeight="600px" 
  >
    <Slider {...sliderSettings}>
      {courseworkByYear[year].map((coursework, index) => (
       <Box
       key={coursework.slug}
       px={7}
       boxSizing="border-box"
       display="flex" 
       justifyContent="center" 
       alignItems="center" 
       width={{ base: "100%", md: "360px" }} 
       minWidth={{ base: "100%", md: "360px" }} 
     >
       <CourseworkCard
         title={coursework.frontmatter.title}
         summary={coursework.frontmatter.summary}
         slug={coursework.slug}
         year={year}
         index={index}
       />
     </Box>
      ))}
    </Slider>
  </Box>
) : (
  <Box textAlign="center" p={3}>
    <Text color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
      No coursework for {year}
      {year === 1 ? "st" : year === 2 ? "nd" : year === 3 ? "rd" : "th"} year
    </Text>
    <Text fontSize="sm" mt={2} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
      Debug: courseworkByYear[{year}] = {JSON.stringify(courseworkByYear[year] || [])}
    </Text>
  </Box>
)}
        </Box>
      );
    })}
  </Box></>
);
}


export async function getStaticProps() {
  const courseworksDir = path.join(process.cwd(), "public", "courseworks");
  let files;
  try {
    files = (await fs.readdir(courseworksDir)).filter((file) =>
      file.endsWith(".mdx")
    );
    console.log("Files found:", files);
  } catch (error) {
    console.error("Error reading courseworks directory:", error);
    return {
      props: {
        courseworkByYear: {},
      },
    };
  }

  if (files.length === 0) {
    console.log("No MDX files found in the courseworks directory.");
    return {
      props: {
        courseworkByYear: {},
      },
    };
  }

  const CourseworkData = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(courseworksDir, file);
      let fileContent;
      try {
        fileContent = await fs.readFile(filePath, "utf8");
        console.log(`Successfully read file: ${file}`);
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
        return null;
      }

      let frontmatter;
      try {
        const parsed = matter(fileContent);
        frontmatter = parsed.data;
        console.log(`Frontmatter for ${file}:`, frontmatter);
      } catch (error) {
        console.error(`Error parsing frontmatter for ${file}:`, error);
        return null;
      }

      const slug = file.replace(".mdx", "");

      if (!frontmatter.publishedDate) {
        console.warn(
          `File ${file} is missing 'publishedDate' in frontmatter, defaulting to 1st year`
        );
        return { frontmatter, slug, year: 1 };
      }

      let year;
      try {
        const publishDate = new Date(frontmatter.publishedDate);
        if (isNaN(publishDate.getTime())) {
          throw new Error("Invalid date");
        }

        const month = publishDate.getMonth(); 
        const yearNum = publishDate.getFullYear();

        console.log(
          `Date for ${file}: ${publishDate}, Year: ${yearNum}, Month: ${month + 1}`
        );

        
        if (yearNum === 2021 || (yearNum === 2022 && month < 8)) {
          year = 1; 
        } else if (yearNum === 2022 || (yearNum === 2023 && month < 8)) {
          year = 2; 
        } else if (yearNum === 2023 || (yearNum === 2024 && month < 8)) {
          year = 3; 
        } else if (yearNum === 2024 || (yearNum === 2025 && month < 8)) {
          year = 4; 
        } else {
          year = 1; 
          console.warn(
            `Date ${frontmatter.publishedDate} falls outside defined ranges for ${file}, defaulting to 1st year`
          );
        }
      } catch (error) {
        console.error(`Error parsing date for ${file}:`, error);
        year = 1;
      }

      console.log(`Calculated year for ${file}: ${year}`);

      return { frontmatter, slug, year };
    })
  );

  const validCourseworkData = CourseworkData.filter((item) => item !== null);
  console.log("Valid Works Data after filtering:", validCourseworkData);

  const uniqueCourseworkData = Array.from(
    new Map(validCourseworkData.map((item) => [item.slug, item])).values()
  );
  console.log("Unique Works Data:", uniqueCourseworkData);

  const courseworkByYear = uniqueCourseworkData.reduce((acc, coursework) => {
    acc[coursework.year] = acc[coursework.year] || [];
    acc[coursework.year].push(coursework);
    return acc;
  }, {});
  console.log("Coursework By Year:", courseworkByYear);

  return {
    props: {
      courseworkByYear,
    },
  };
}