import NextLink from 'next/link';
import {Link,Container,Heading,Box,SimpleGrid,Button,FormControl,FormLabel,Input,Textarea,useColorModeValue, useToast} from '@chakra-ui/react';
import {EmailIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema } from '../lib/schemas'; 
import Layout from '../components/layouts/article';
import Section from '../components/section';
import { FaSketch, FaWordpress, FaReact,  } from 'react-icons/fa';
import { BiLogoFigma } from "react-icons/bi";
import { SiAdobexd } from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb";

import Image from 'next/image';
import WorkExperience from '../components/workexperiencemainpage';
import React, { useState } from 'react';




const skills = [
  { name: 'Subcontractor Management', icon: <BiLogoFigma />, color: '#F24E1E' },
  { name: 'Sketch', icon: <FaSketch />, color: '#F7B500' },
  { name: 'XD', icon: <SiAdobexd />, color: '#FF61F6' },
  { name: 'WordPress', icon: <FaWordpress />, color: '#21759B' },
  { name: 'React', icon: <FaReact />, color: '#61DAFB' },
  { name: 'JavaScript', icon: <TbBrandJavascript />, color: '#F7DF1E' },
  
];

const SkillItem = ({ name, icon, color }) => {
  const bgColor = useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_SKILLSSECTION_BGCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_SKILLSSECTION_BGCOLOR_DARK);
  const textColor = useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_SKILLSSECTION_TEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_SKILLSSECTION_TEXTCOLOR_DARK);
  const glowColor = useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_SKILLSSECTION_GLOWCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_SKILLSSECTION_GLOWCOLOR_DARK)
  const bordercolorishovering = useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_SKILLSSECTION_BORDERCOLORISHOVERING_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_SKILLSSECTION_BORDERCOLORISHOVERING_DARK)
  const textcolorishovering = useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_SKILLSSECTION_TEXTCOLORISHOVERING_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_SKILLSSECTION_TEXTCOLORISHOVERING_DARK)


  const [isHovering, setIsHovering] = useState(false);

  const baseBrowserWidth = 1800;
  const baseContainerWidth = 180;  
  const baseAspectRatio = 183 / 180; 
  const minContainerWidth = 150;    
  const maxContainerWidth = 220;    

  
  const widthScaleFactor = baseContainerWidth / baseBrowserWidth;
  const containerWidth = `clamp(${minContainerWidth}px, ${widthScaleFactor * 100}vw, ${maxContainerWidth}px)`;
  const containerHeight = `calc(${containerWidth} * ${baseAspectRatio})`;

  
  const basePaddingVertical = 40;    
  const basePaddingHorizontal = 15;
  const paddingScaleFactor = baseContainerWidth / baseBrowserWidth;
  const paddingVertical = `calc(${basePaddingVertical * paddingScaleFactor} * 1vw)`;
  const paddingHorizontal = `calc(${basePaddingHorizontal * paddingScaleFactor} * 1vw)`;

  
  const baseBorderRadius = 20;
  const borderRadius = `calc(${baseBorderRadius * paddingScaleFactor} * 1vw)`;

  const transitionTiming = '0.2s ease-in-out';

  const coloredIcon = React.cloneElement(icon, {
    color: isHovering ? color : textColor,
    size: 'clamp(40px, 3.5vw, 70px)', 
    style: { 
      transition: `color ${transitionTiming}`
    }
  });
  const isTwoLineText = name.length > 15 || name.includes(' ');
  return (
    <Box
      w={containerWidth}
      h={containerHeight}
      p={paddingVertical}
      px={paddingHorizontal}
      borderRadius={borderRadius}
      bg={isHovering ? glowColor : bgColor}
      textAlign="center"
      position="relative"
      overflow="hidden"
      transition={`all ${transitionTiming}`} 
      border="2px solid"
      borderColor={isHovering ? bordercolorishovering : glowColor}
      boxShadow={isHovering ? `0 0 15px ${glowColor}` : 'none'}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={glowColor}
        opacity={isHovering ? 0.1 : 0} 
        transition={`opacity ${transitionTiming}`} 
        pointerEvents="none"
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100% - 60px)"
        mb={4}
        transition={`transform ${transitionTiming}`} 
        transform={isHovering ? 'scale(1.05)' : 'scale(1)'}
      >
        {coloredIcon}
      </Box>
      <Box
        fontSize="clamp(12px, 1vw, 16px)" 
        color={isHovering ? textcolorishovering : textColor}
        transition={`color ${transitionTiming}`}
        minHeight="clamp(80px, 2.5vw, 100px)"
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        whiteSpace="normal" 
        lineHeight="1.2"
        fontWeight="700"
        pt="clamp(16px, 1vw, 18px)"
        px={2} 
      >
        {name}
      </Box>
    </Box>
  );
};

const SkillsSection = () => {
  return (
    <Box px={['10px', '20px', "0px"]}> {/* Responsive section padding */}
      <SimpleGrid
        columns={[2, 3, 6]}
        spacing={['10px', '20px', 'clamp(50px, 1.5vw, 100px)']}
        justifyItems="center"
        maxW="2900px" 
        mx="auto"     
      >
        {skills.map((skill, index) => (
          <SkillItem
            key={index}
            name={skill.name}
            icon={skill.icon}
            color={skill.color}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const experiences = [
  {
    company: 'Milsan Elektronik',
    title: 'PCB Designer Intern',
    link: 'milsan',
    date: 'May 2024 - Sep 2024',
    description: [
      'Designed 2-layer PCBs for coffee makers and ovens using HT66F004 and SC95F8523M28U microcontrollers with transformerless AC/DC converters (230V to 5V/18V DC)',
      'Implemented 4 capacitive touch sensors, 15-pin LED display (oven), temperature and water level sensors (coffee maker) for safety',
      'Routed high-speed signals (16MHz) with impedance matching; validated designs in EasyEDA',
      'Programmed microcontrollers in C++ with PID controllers; developed BOMs, Gerber files, sourcing components from 15+ manufacturers'
    ],
    logo: 'milsanmainpage.png',
  },
  {
    company: 'Starbucks',
    title: 'React.js Developer',
    link: 'milsan',
    date: 'March 2020 - April 2021',
    description: [
      'Developed and maintained web applications using React.js and other related technologies.',
      'Collaborated with cross-functional teams including designers, product managers, and developers.',
      'Implemented responsive design and ensured cross-browser compatibility.',
      'Participated in code reviews and provided constructive feedback to other developers.',
    ],
    logo: 'koktobe.jpg',
  },
  {
    company: 'Starbucks',
    title: 'React.js Developer',
    link: 'milsan',
    date: 'March 2020 - April 2021',
    description: [
      'Developed and maintained web applications using React.js and other related technologies.',
      'Collaborated with cross-functional teams including designers, product managers, and developers.',
      'Implemented responsive design and ensured cross-browser compatibility.',
      'Participated in code reviews and provided constructive feedback to other developers.',
    ],
    logo: 'koktobe.jpg',
  },
  {
    company: 'Starbucks',
    title: 'React.js Developer',
    link: 'milsan',
    date: 'March 2020 - April 2021',
    description: [
      'Developed and maintained web applications using React.js and other related technologies.',
      'Collaborated with cross-functional teams including designers, product managers, and developers.',
      'Implemented responsive design and ensured cross-browser compatibility.',
      'Participated in code reviews and provided constructive feedback to other developers.',
    ],
    logo: 'eco2.jpg',
  },
];

const Home = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' }, 
  });

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data); // Log form data before sending
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log('Response status:', response.status); // Log HTTP status
      const responseData = await response.json(); // Parse response body
      console.log('Response data:', responseData); // Log response body
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast({
        title: 'Message sent successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      console.error('Submission error:', error.message); // Log any errors
      toast({
        title: 'An error occurred!',
        description: 'Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
  <Layout>
    <Container maxW="80%" px={4} pt={24} >
      <Box display={{ md: 'flex' }} alignItems="center">
        <Box flexGrow={1}>
          <Heading 
            as="h1" 
            variant="page-title" 
            fontSize="36px"
            mb={2}
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
          >
            YERKIN TULENOV
          </Heading>
          <Heading 
            fontSize="xl"
            fontWeight="semibold"
            as="h3"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
          >
            Electrical Engineer
          </Heading>
        </Box>

        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
        >
          <Box
            borderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_PHOTO_BORDERCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_PHOTO_BORDERCOLOR_DARK)}
            borderWidth={2}
            borderStyle="solid"
            w="200px"
            h="200px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              src="/images/yerkin1.png"
              alt="Profile image"
              width={200}
              height={200}
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h1" fontSize="3xl" variant="section-title" pt={20} mb={2}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
          ABOUT
        </Heading>
        <Box ml={0}>
          <Heading
            fontSize="lg"
            fontWeight="semibold"
            as="h3"
            lineHeight="1.5"
            pt={4}
            
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
          >
            Hi, I’m Yerkin Tulenov — a hands-on learner and Bachelor of Applied Science candidate at the University of British Columbia, deeply engaged in PCB design, FPGA prototyping, and VLSI systems. I’m passionate about transforming theoretical concepts into practical solutions and developing high-speed, efficient systems that balance performance and functionality. You can check my work experience using this link{' '}
            <Link as={NextLink} href="/works" passHref scroll={false}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              Work
            </Link>
            , find out more about my education at UBC here{' '}
            <Link as={NextLink} href="/eduleader" passHref scroll={false}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              Education
            </Link>
            , explore my projects here{' '}
            <Link as={NextLink} href="/projects" passHref scroll={false}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              Projects
            </Link>
            , lab reports and coursework following this link{' '}
            <Link as={NextLink} href="/courseworks" passHref scroll={false}   fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              Coursework
            </Link>
            , posts here{' '}
            <Link as={NextLink} href="/posts" passHref scroll={false}   fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              Posts
            </Link>
            , and finally access the source codes, designs and schematics — including EDA and CAD designs —{' '}
            <Link
              as={NextLink}
              href="https://github.com/ytulenov?tab=repositories"
              passHref
              target="_blank"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              GitHub
            </Link>.
          </Heading>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" pt={8}>
          <Button as={NextLink} href="/projects" scroll={false}  mx={2} fontSize="18px" _hover={{
    bg: useColorModeValue(
      process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
      process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
    ),}}
    color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
           fontWeight="bold" borderRadius='md' fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}  bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}>
            My Portfolio
          </Button>
          <Button as={NextLink} href="/Yerkin_Tulenov_CV.pdf"  _hover={{
    bg: useColorModeValue(
      process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
      process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
    ),}}
          download mx={2} fontSize="18px" fontWeight="bold" borderRadius='md'  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)} color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}>
            Download CV
          </Button>
        </Box>
      </Section>

      <Section delay={0.2}>
      <Heading as="h1" fontSize="3xl" variant="section-title" pt={20} mb={2}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
          EDUCATION
        </Heading>

        <Box ml={0}>
          <Heading
            fontSize="lg"
            fontWeight="semibold"
            as="h3"
            lineHeight="1.5"
            pt={4}
            
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
          >
      Bachelor of Applied Science in Electrical Engineering
    </Heading>

    <Heading
      fontSize="md"
      mt={2}
      color={useColorModeValue(
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
      )}
      opacity={0.6}
      fontWeight="normal"
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
    >
      Sep 2021 - Jun 2025
    </Heading>

    <Heading
      fontSize="md"
      mt={1}
      opacity={0.6}
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
      color={useColorModeValue(
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
      )}
      fontWeight="medium"
      fontStyle="italic"
    >
      University of British Columbia, BC, Canada
    </Heading>

    <Box mt={4}>
      <Heading
        fontSize="lg"
        fontWeight="semibold"
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
        color={useColorModeValue(
          process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
          process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
        )}
      >
        Related Coursework:
      </Heading>
      <Heading
        fontSize="md"
        mt={1}
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
        color={useColorModeValue(
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
        process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
      )}
      opacity={0.6}
        fontWeight="normal"
        lineHeight="1.6"
      >
        Embedded Systems, VLSI Design, Control Systems, and PCB Prototyping
      </Heading>
    </Box>

    <Box display="flex" justifyContent="center" alignItems="center" pt={8}>
    <Button
        as={NextLink} href="/eduleader" scroll={false}
        mx={2}
        fontSize= "18px"
        fontWeight="bold"
        borderRadius="md"
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
        bg={useColorModeValue(
          process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT,
          process.env.NEXT_PUBLIC_BUTTON_BG_DARK
        )}
        color={useColorModeValue(
          process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT,
          process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK
        )}
        _hover={{
          bg: useColorModeValue(
            process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
            process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
          ),
        }}
      >
         Academic Journey
      </Button>
      <Button
        as={NextLink}
        href="/Yerkin's Transcript.xlsx"
        download
        mx={2}
        fontSize= "18px"
        fontWeight="bold"
        borderRadius="md"
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
        bg={useColorModeValue(
          process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT,
          process.env.NEXT_PUBLIC_BUTTON_BG_DARK
        )}
        color={useColorModeValue(
          process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT,
          process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK
        )}
        _hover={{
          bg: useColorModeValue(
            process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
            process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
          ),
         
        }}
        
        
      >
        Download Transcript
      </Button>
     
    </Box>
  </Box>
</Section>


      <WorkExperience experiences={experiences} />

      <Section delay={0.3}>
          <Heading
            as="h1"
            variant="section-title"
            fontSize="3xl"
            py={14}
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
            )}
          >
            SKILLS
          </Heading>
          <SkillsSection />
        </Section>

      
      <Section delay={0.3}>
        <Heading as="h1" variant="section-title" fontSize="3xl" pt={24}fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
          SEND ME A MESSAGE TO CONTACT
        </Heading>
        <Heading fontSize="lg" fontWeight="semibold" as="h3" pt={4} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
          Get in touch with me for collaborations, questions, or just to say hi!
        </Heading>
        <Box maxW="80%" mx="auto" pt={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="name" mb={6} isRequired isInvalid={!!errors.name}>
                <FormLabel fontWeight="semibold" as="h3" fontSize="lg" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
                  Name
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Your name"
                  size="lg"
                  {...register('name')}
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                  color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_DARK)}
                  focusBorderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_DARK)}
                  _placeholder={{ color: useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_DARK) }}
                  bg={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_DARK)}
                  borderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK)}
                />
                {errors.name && (
                  <Box color="red.500" mt={2} fontSize="sm">
                    {errors.name.message}
                  </Box>
                )}
              </FormControl>

              <FormControl id="email" mb={6} isRequired isInvalid={!!errors.email}>
                <FormLabel fontWeight="semibold" as="h3" fontSize="lg" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
                  Email
                </FormLabel>
                <Input
                  type="email"
                  placeholder="Your email"
                  size="lg"
                  {...register('email')}
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                  color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_DARK)}
                  focusBorderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_DARK)}
                  _placeholder={{ color: useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_DARK) }}
                  bg={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_DARK)}
                  borderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK)}
                />
                {errors.email && (
                  <Box color="red.500" mt={2} fontSize="sm">
                    {errors.email.message}
                  </Box>
                )}
              </FormControl>
              <FormControl id="subject" mb={6} isRequired isInvalid={!!errors.subject}>
                <FormLabel fontWeight="semibold" as="h3" fontSize="lg" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
                  Subject
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Your subject"
                  size="lg"
                  {...register('subject')}
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                  color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_DARK)}
                  focusBorderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_DARK)}
                  _placeholder={{ color: useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_DARK) }}
                  bg={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_DARK)}
                  borderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK)}
                />
                {errors.subject && (
                  <Box color="red.500" mt={2} fontSize="sm">
                    {errors.subject.message}
                  </Box>
                )}
              </FormControl>

              <FormControl id="message" mb={8} isRequired isInvalid={!!errors.message}>
                <FormLabel fontWeight="semibold" as="h3" fontSize="lg" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
                  Message
                </FormLabel>
                <Textarea
                  placeholder="Your message"
                  rows={8}
                  size="lg"
                  {...register('message')}
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                  color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_DARK)}
                  focusBorderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_DARK)}
                  _placeholder={{ color: useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_DARK) }}
                  bg={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_DARK)}
                  borderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK)}
                />
                {errors.message && (
                  <Box color="red.500" mt={2} fontSize="sm">
                    {errors.message.message}
                  </Box>
                )}
              </FormControl>

              <Box textAlign="center">
                <Button
                  type="submit"
                  leftIcon={<EmailIcon />}
                  fontSize="18px"
                  fontWeight="bold"
                  borderRadius="md"
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                  bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
                  color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
                  _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK) }}
                  isLoading={isSubmitting}
                  loadingText="Submitting..."
                >
                  Send Message
                </Button>
              </Box>
            </form>
</Box>
      </Section>
    </Container>
  </Layout>
)}

export default Home
export { getServerSideProps } from '../components/chakra'