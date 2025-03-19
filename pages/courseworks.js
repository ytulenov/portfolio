import { Box, Text, Heading, Flex, Image, useColorModeValue } from "@chakra-ui/react";

import Slider from "react-slick";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Global } from "@emotion/react";

// Custom arrow components for the carousel

// Custom card component for coursework
// Custom card component for coursework
// Custom card component for coursework
// Custom card component for coursework
// Custom card component for coursework
// Custom card component for coursework
const CourseworkCard = ({ title, summary, slug, year, index }) => {
  const lightCardColors = (process.env.NEXT_PUBLIC_COURSEWORKS_COURSECARD_MULTIPLECOLORSELECTION_LIGHT).split(",");
  const darkCardColors = (process.env.NEXT_PUBLIC_COURSEWORKS_COURSECARD_MULTIPLECOLORSELECTION_DARK).split(",");

  const cardColors = useColorModeValue(lightCardColors, darkCardColors);
  const bgColor = cardColors[index % cardColors.length];
  const icons = [
    "/abstract-2.png", // Example icon paths, adjust as needed
    "/abstract-3.png",
    "/abstract-shape.png",
    "/rounded.png",
    "/abstract.png",
  ];
  const iconSrc = icons[Math.floor(Math.random() * icons.length)];

  // Format the number: "01" to "09" for 1-9, "10" and above as is
  const formattedNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

  return (
    <Link href={`/courseworks/${slug}`} passHref legacyBehavior>
      <Box
        as="a"
        bg={bgColor}
        borderRadius="20px" // Rounded corners to match image
        w={{ base: "100%", md: "360px" }} // Reduced from 360px to 300px at md+
        h="545px" // Fixed height to match approximate card height
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
        boxShadow="md"
        
        p={6} // Internal padding: 24px
        transition="transform 0.3s ease" // Smooth hover transition
        _hover={{
          "& .title-container": {
            top: "55%", // Move title up on hover
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
          <Image
            src={iconSrc} // Use specific icons based on index
            alt="Icon"
            boxSize="50px"
            fallback={<Box w="32px" h="32px" bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} borderRadius="full" />}
          />
        </Box>

        {/* Title and Number (number above title, moves up on hover) */}
        <Box
          className="title-container"
          position="absolute"
          top="60%" // Start lower
          transf3rm="translateY(-50%)" // Center vertically
          transition="all 0.3s ease" // Smooth transition for hover
          display="flex"
          flexDirection="column" // Stack number above title
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
            mb={2} // Margin-bottom to space from title
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
              maxW="200px" // Adjusted to fit with button
              
            >
              {title}
            </Text>

            {/* Read More Button on the right (hidden by default) */}
            <Box
              className="read-more-button"
              opacity={0}
              transform="translateY(-10px)"
              transition="opacity 0.3s ease, transform 0.3s ease"
              ml={4} // Margin-left to space from title
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
          //textAlign="center"
          position="absolute"
          top="70%" // Position below title after it moves up
          opacity={0}
          w={{ base: "90%", md: "275px" }} // Adjusted for smaller card width
          //ml={20}
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
            //maxW="350px"
          >
            {summary || "No summary available"}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

// Main component
export default function Courseworks({ courseworkByYear }) {
  const baseSliderSettings = {
    dots: true,
    speed: 500,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1, // Smooth scrolling one slide at a time
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
    centerPadding: "0px",
    arrows: true, // Explicitly enable arrows
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 3 } }, // 3 × 360px = 1080px + padding
      { breakpoint: 1200, settings: { slidesToShow: 2 } }, // 2 × 360px = 720px + padding
      { breakpoint: 800, settings: { slidesToShow: 1 } },  // 1 × 360px = 360px + padding
    ],
    className: "custom-slider",
  };

  const years = [4, 3, 2, 1]; // Reordered to start with 4th year
  const dotColor = useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK); // Dark gray for light mode, white for dark mode
  const activeDotColor = useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK); // Black for light mode, tangerine for dark mode
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
    //maxW={{ base: "100%", md: "1200px" }} // Constrain width to keep arrows visible
    minHeight="600px" // Ensure space for arrows
  >
    <Slider {...sliderSettings}>
      {courseworkByYear[year].map((coursework, index) => (
        <Box
          key={coursework.slug}
          px={7}
          boxSizing="border-box"
          display="inline-block"
          width={{ base: "100%", md: "300px !important" }} 
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

// Fetch and categorize coursework by year
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

        const month = publishDate.getMonth(); // 0-11 (January = 0, September = 8)
        const yearNum = publishDate.getFullYear();

        console.log(
          `Date for ${file}: ${publishDate}, Year: ${yearNum}, Month: ${month + 1}`
        );

        // Academic year logic: Assuming you started in Sep 2021
        if (yearNum === 2021 || (yearNum === 2022 && month < 8)) {
          year = 1; // 1st year: Sep 2021 - Aug 2022
        } else if (yearNum === 2022 || (yearNum === 2023 && month < 8)) {
          year = 2; // 2nd year: Sep 2022 - Aug 2023
        } else if (yearNum === 2023 || (yearNum === 2024 && month < 8)) {
          year = 3; // 3rd year: Sep 2023 - Aug 2024
        } else if (yearNum === 2024 || (yearNum === 2025 && month < 8)) {
          year = 4; // 4th year: Sep 2024 - Aug 2025
        } else {
          year = 1; // Default to 1st year for dates outside the range
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