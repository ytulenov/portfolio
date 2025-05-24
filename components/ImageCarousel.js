import { Box, Text } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import Slider from 'react-slick';
import Image from 'next/image';
import { useColorModeValue } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import path from 'path';

// Carousel settings from your example
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

const ImageCarousel = ({ images = [], baseDir, altPrefix = 'Carousel Image' }) => {
  // Define dynamic colors for dots and arrows
  const dotColor = useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK); 
  const activeDotColor = useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK); 
   const arrowColor = useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK);
   const borderColor = useColorModeValue(
    process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_LIGHT,
    process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_DARK// General text color for dark mode
  );

  if (!images || images.length === 0) {
    return <Text>No images available for the carousel.</Text>;
  }

  // Resolve path function (copied from ProjectsPage for completeness)
  const resolvePath = (filePath, baseDir) => {
    if (filePath.startsWith('/')) {
      return filePath;
    }
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    if (imageExtensions.some((ext) => filePath.toLowerCase().endsWith(ext))) {
      const resolvedPath = `/images/projects/${filePath}`;
      console.log(`Resolving image path: ${filePath} -> ${resolvedPath}`);
      return resolvedPath;
    }
    const resolvedPath = path.posix.join(baseDir, filePath);
    console.log(`Resolving path: ${filePath} -> ${resolvedPath}`);
    return resolvedPath;
  };

  return (
    <>
      {/* Inject global styles for slider dots and arrows */}
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
      <Box
         mb={2}
          width={{ base: "100%", md: "960px" }} 
          maxW="100%" 
          height="540px"
          mx="auto"
         border={2}
      >
        <Slider {...carouselSettings}>
          {images.map((image, index) => (
            <Box key={index}>
              <Image
                src={resolvePath(image.src, baseDir)}
                alt={image.alt || `${altPrefix} ${index + 1}`}
                width={960}            
                height={540}                
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px', aspectRatio: "1920 / 1080",  border: `1px solid ${borderColor}`}}
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
                {image.alt || `${altPrefix} ${index + 1}`}
              </Text>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default ImageCarousel;