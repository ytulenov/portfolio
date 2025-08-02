import NextLink from 'next/link';
import {Link,Container,Heading,Box,SimpleGrid,Button,HStack,FormControl,FormLabel,Input,Textarea,useColorModeValue, useToast} from '@chakra-ui/react';
import {EmailIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema } from '../lib/schemas'; 
import Layout from '../components/layouts/article';
import Section from '../components/section';
import Image from 'next/image';
import WorkExperience from '../components/workexperiencemainpage';
import React, { useState } from 'react';
import { VscTerminalBash } from "react-icons/vsc";
import { TbBrandPowershell,  TbBrandJavascript, TbBrandOauth, TbFileTypeSql, TbApi, TbReport, TbSettingsAutomation} from "react-icons/tb";
import { SiAutocad, SiAmazonaws, SiArduino, SiGithub, SiGooglecolab, SiJupyter, SiMicrosoft, SiMysql, SiNumpy, SiOpencv, SiPandas, SiPytorch, SiRaspberrypi, SiSelenium, SiSolidworks, SiTensorflow, SiVisualstudiocode } from "react-icons/si"; // Added icons for additional skills
import { FaPython, FaReact, FaRProject, FaNetworkWired, FaFileExcel, FaProjectDiagram } from "react-icons/fa";
import { SiCplusplus, SiC, SiTypescript, SiPrisma, SiShadcnui, SiCloudinary, SiAmazoniam, SiKicad, SiLtspice, SiPfsense, SiAutodeskrevit, SiKeras, SiPlanetscale, SiArm, SiVelog, SiAmazonec2, SiAmazons3, SiCyberdefenders, SiOpenvpn } from "react-icons/si";
import { RiNextjsFill, RiTailwindCssLine } from "react-icons/ri";
import { DiNodejs } from "react-icons/di";
import { GiCircuitry, GiElectricalSocket, GiElectricalCrescent } from "react-icons/gi";
import { PiMicrosoftExcelLogoFill, PiCircuitryFill, PiDetectiveDuotone } from "react-icons/pi";
import { BsFiletypeJson, BsPcDisplayHorizontal } from "react-icons/bs";
import { FcScatterPlot } from "react-icons/fc";
import { CiMicrochip } from "react-icons/ci";
import { MdOutlinePrivateConnectivity, MdOutlineElectricMeter, MdElectricalServices, MdOutlinePrecisionManufacturing } from "react-icons/md";
import { IoIosCloud } from "react-icons/io";
import { GrSchedulePlay } from "react-icons/gr";

const skills = [
  { name: 'Bash', icon: <VscTerminalBash />, color: '#2f3a3e', category: 'Programming Languages & Web Development' },
  { name: 'C', icon: <SiC />, color: '#03599c', category: 'Programming Languages & Web Development' },
  { name: 'C++', icon: <SiCplusplus />, color: '#659ad2', category: 'Programming Languages & Web Development' },
  { name: 'JS/HTML/CSS', icon: <TbBrandJavascript />, color: '#f7df1e', category: 'Programming Languages & Web Development' },
  { name: 'Powershell', icon: <TbBrandPowershell />, color: '#0277bd', category: 'Programming Languages & Web Development' },
  { name: 'Python', icon: <FaPython />, color: '#ffe873', category: 'Programming Languages & Web Development' },
  { name: 'R/RStudio', icon: <FaRProject />, color: '#2167ba', category: 'Programming Languages & Web Development' },
  { name: 'React', icon: <FaReact />, color: '#61dafb', category: 'Programming Languages & Web Development' },
  { name: 'SQL', icon: <TbFileTypeSql />, color: '#df6c20', category: 'Programming Languages & Web Development' },
  { name: 'Typescript', icon: <SiTypescript />, color: '#3178c6', category: 'Programming Languages & Web Development' },
  { name: 'Verilog', icon: <SiVelog />, color: '#000000', category: 'Programming Languages & Web Development' },
  { name: 'ClerkAuth', icon: <TbBrandOauth />, color: '#9fbddf', category: 'Programming Languages & Web Development' },
  //{ name: 'NextJs', icon: <RiNextjsFill />, color: '#3178c6', category: 'Programming Languages & Web Development' },
  { name: 'NodeJs', icon: <DiNodejs />, color: '#83cd29', category: 'Programming Languages & Web Development' },
  { name: 'Prisma', icon: <SiPrisma />, color: '#123a51', category: 'Programming Languages & Web Development' },
  //{ name: 'Tailwind', icon: <RiTailwindCssLine />, color: '#3178c6', category: 'Programming Languages & Web Development' },
  //{ name: 'ShadcnUI', icon: <SiShadcnui />, color: '#3178c6', category: 'Programming Languages & Web Development' },
  //{ name: 'Cloudinary', icon: <SiCloudinary />, color: '#3178c6', category: 'Programming Languages & Web Development' },

  // Software Tools
  //{ name: 'AutoCAD', icon: <SiAutocad />, color: '#3178c6', category: 'Software Tools' },
  { name: 'EasyEDA', icon: <GiCircuitry />, color: '#5588ff', category: 'Software Tools' },
  { name: 'Excel', icon: <PiMicrosoftExcelLogoFill />, color: '#138147', category: 'Software Tools' },
  { name: 'Git/Github', icon: <SiGithub />, color: '#712789', category: 'Software Tools' },
  { name: 'Google Colab', icon: <SiGooglecolab />, color: '#fea602', category: 'Software Tools' },
  { name: 'InduSoft Web', icon: <FaNetworkWired />, color: '#039547', category: 'Software Tools' },
  { name: 'Jupyter Notebook', icon: <SiJupyter />, color: '#f37726', category: 'Software Tools' },
  { name: 'KiCAD EDA', icon: <SiKicad />, color: '#314cb0', category: 'Software Tools' },
  { name: 'LTSpice', icon: <SiLtspice />, color: '#900029', category: 'Software Tools' },
  { name: 'MS Office', icon: <SiMicrosoft />, color: '#737373', category: 'Software Tools' },
  { name: 'MySQL', icon: <SiMysql />, color: '#e48e00', category: 'Software Tools' },
  { name: 'PFsense+', icon: <SiPfsense />, color: '#2b40b5', category: 'Software Tools' },
  { name: 'REVIT', icon: <SiAutodeskrevit />, color: '#186bff', category: 'Software Tools' },
  //{ name: 'SolidWorks', icon: <SiSolidworks />, color: '#3178c6', category: 'Software Tools' },
  { name: 'VS Code', icon: <SiVisualstudiocode />, color: '#22a5f1', category: 'Software Tools' },

  // Libraries & Frameworks
  { name: 'Json', icon: <BsFiletypeJson />, color: '#194485', category: 'Libraries & Frameworks' },
  { name: 'Keras', icon: <SiKeras />, color: '#d00000', category: 'Libraries & Frameworks' },
  //{ name: 'Labelme', icon: <SiTypescript />, color: '#3178c6', category: 'Libraries & Frameworks' },
  //{ name: 'Matplotlib', icon: <FcScatterPlot />, color: '#11557c', category: 'Libraries & Frameworks' },
  //{ name: 'NumPy', icon: <SiNumpy />, color: '#3178c6', category: 'Libraries & Frameworks' },
  { name: 'OpenCV', icon: <SiOpencv />, color: '#ff2a44', category: 'Libraries & Frameworks' },
  { name: 'OpenPyxl', icon: <FaFileExcel />, color: '#237047', category: 'Libraries & Frameworks' },
  { name: 'PlanetScale', icon: <SiPlanetscale />, color: '#000000', category: 'Libraries & Frameworks' },
  { name: 'Pandas', icon: <SiPandas />, color: '#130754', category: 'Libraries & Frameworks' },
  { name: 'Pytorch', icon: <SiPytorch />, color: '#ef4c2a', category: 'Libraries & Frameworks' },
  { name: 'Selenium', icon: <SiSelenium />, color: '#00b400', category: 'Libraries & Frameworks' },
  { name: 'TensorFlow', icon: <SiTensorflow />, color: '#ff9000', category: 'Libraries & Frameworks' },

  // Hardware and Electronics
  { name: 'Arduino', icon: <SiArduino />, color: '#00979c', category: 'Hardware and Electronics' },
  { name: 'ARM Assembly', icon: <SiArm />, color: '#0092be', category: 'Hardware and Electronics' },
  { name: 'Circuit Design/Components', icon: <PiCircuitryFill />, color: '#009730', category: 'Hardware and Electronics' },
  { name: 'Quartus', icon: <CiMicrochip />, color: '#b6cae5', category: 'Hardware and Electronics' },
  { name: 'Raspberry PI', icon: <SiRaspberrypi />, color: '#bd1143', category: 'Hardware and Electronics' },
  { name: 'Verilog', icon: <SiVelog />, color: '#000000', category: 'Hardware and Electronics' },
  { name: 'KiCAD', icon: <SiKicad />, color: '#314cb0', category: 'Hardware and Electronics' },

  // Standards & Infrastructure
  { name: 'AWS', icon: <SiAmazonaws />, color: '#ff9900', category: 'Standards & Infrastructure' },
  { name: 'AWS IAM', icon: <SiAmazoniam />, color: '#759c3e', category: 'Standards & Infrastructure' },
  { name: 'DMZ', icon: <MdOutlinePrivateConnectivity />, color: '#5737fc', category: 'Standards & Infrastructure' },
  { name: 'CSA 2021', icon: <GiElectricalSocket />, color: '#0171ba', category: 'Standards & Infrastructure' },
  { name: 'EC2', icon: <SiAmazonec2 />, color: '#e97b0c', category: 'Standards & Infrastructure' },
  { name: 'S3', icon: <SiAmazons3 />, color: '#3f8624', category: 'Standards & Infrastructure' },
  { name: 'Net Metering', icon: <MdOutlineElectricMeter />, color: '#fdc358', category: 'Standards & Infrastructure' },
  { name: 'NIST CSF', icon: <SiCyberdefenders />, color: '#0231b5', category: 'Standards & Infrastructure' },
  { name: 'REST API', icon: <TbApi />, color: '#594ed2', category: 'Standards & Infrastructure' },
  { name: 'VPC', icon: <IoIosCloud />, color: '#7847d6', category: 'Standards & Infrastructure' },
  { name: 'OpenVPN', icon: <SiOpenvpn />, color: '#ed7f22', category: 'Standards & Infrastructure' },
  { name: 'Suricata IPS/IDS', icon: <PiDetectiveDuotone />, color: '#d8582b', category: 'Standards & Infrastructure' },

  // Engineering and Project Management
  { name: 'Daily Reports', icon: <TbReport />, color: '#FFC0CB', category: 'Engineering and Project Management' },
  { name: 'CSA Compliance', icon: <GiElectricalSocket />, color: '#0171ba', category: 'Engineering and Project Management' },
  { name: 'Electrical System Installation', icon: <MdElectricalServices />, color: '#b5fdff', category: 'Engineering and Project Management' },
  //{ name: 'GOST Compliance', icon: <GiElectricalCrescent />, color: '#cae7d3', category: 'Engineering and Project Management' },
  { name: 'HMI', icon: <BsPcDisplayHorizontal />, color: '#f70100', category: 'Engineering and Project Management' },
  { name: 'PLC', icon: <MdOutlinePrecisionManufacturing />, color: '#ffc826', category: 'Engineering and Project Management' },
  { name: 'Process Automation', icon: <TbSettingsAutomation />, color: '#d49137', category: 'Engineering and Project Management' },
  { name: 'Schedule Development', icon: <GrSchedulePlay />, color: '#019938', category: 'Engineering and Project Management' },
  { name: 'Subcontractor Management', icon: <FaProjectDiagram />, color: '#FFD700', category: 'Engineering and Project Management' },
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
  const iconSize = 'clamp(40px, 3.5vw, 70px)';

  const renderedIcon = (
    React.cloneElement(icon, {
      color: isHovering ? color : textColor,
      size: iconSize,
      style: {
        transition: `color ${transitionTiming}`,
        width: iconSize,
        height: iconSize,
      },
    })
  );

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
        {renderedIcon}
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
  const categories = [
    'Programming Languages & Web Development',
    'Software Tools',
    'Libraries & Frameworks',
    'Hardware and Electronics',
    'Standards & Infrastructure',
    'Engineering and Project Management',
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0]); // Default to first category

  return (
    <Box px={['10px', '20px', '0px']}>
      {/* Category Buttons */}
      <HStack
        spacing={['2', '4']}
        justify="center"
        mb={10}
        flexWrap="wrap"
        gap={['2', '4']}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            variant={activeCategory === category ? 'solid' : 'outline'}
            size="lg"
            fontSize={['md', 'lg']}
            fontWeight="bold"
            borderRadius="lg"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            bg={
              activeCategory === category
                ? useColorModeValue(
                    process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT,
                    process.env.NEXT_PUBLIC_BUTTON_BG_DARK
                  )
                : 'transparent'
            }
            color={
              activeCategory === category
                ? useColorModeValue(
                    process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT,
                    process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK
                  )
                : useColorModeValue(
                    process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                    process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
                  )
            }
            borderColor={useColorModeValue(
              process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT,
              process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK
            )}
            _hover={{
              bg: useColorModeValue(
                process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
                process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
              ),
              color: useColorModeValue(
                process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT,
                process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK
              ),
            }}
            px={['3', '6']}
            py={['2', '4']}
          >
            {category}
          </Button>
        ))}
      </HStack>

      {/* Skills Grid for Active Category */}
      <Box>
        
        <SimpleGrid
          columns={[2, 3, 6]}
          spacing={['10px', '20px', 'clamp(50px, 1.5vw, 100px)']}
          justifyItems="center"
          maxW="2900px"
          mx="auto"
        >
          {skills
            .filter((skill) => skill.category === activeCategory)
            .map((skill, index) => (
              <SkillItem
                key={index}
                name={skill.name}
                icon={skill.icon}
                color={skill.color}
              />
            ))}
        </SimpleGrid>
      </Box>
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
      'Implemented 4 capacitive touch sensors, LED display (oven), temperature and water level sensors (coffee maker) for safety',
      'Routed high-speed signals (16MHz) with impedance matching; validated designs in EasyEDA',
      'Programmed microcontrollers in C and C++ with PID controllers; developed BOMs, Gerber files, sourcing components from 15+ manufacturers'
    ],
    logo: '/images/works/milsanmainpage.png',
  },
{
  company: 'Bosk Bioproducts',
  title: 'Security Network Engineer',
  link: 'boskbioproducts',
  date: 'May 2023 - Aug 2023',
  description: [
    'Designed a hybrid network infrastructure with DMZ, Restricted Zone, and AWS VPC, integrating Bell’s modem and a PfSense+ router via PPPoE',
    'Mitigated a phishing attack by isolating the affected system, analyzing Suricata IDS/IPS and Gmail logs, updating firewall rules, and refreshing SSH keys to enhance data protection',
    'Improved overall network performance by 40% with subnet segmentation and Wi‑Fi 6 mesh deployment for 30+ office devices',
    'Enabled secure remote access for 10+ lab instruments using OpenVPN, allowing the FLEX department to monitor and control experiments off‑hours'
  ],
  logo: '/images/works/boskmainpage.png',
},
  {
    company: 'ECO2 Magnesia',
    title: 'IT Support',
    link: 'eco2',
    date: 'May 2023 - Aug 2023',
    description: [
      'Collaborated with Head Geoengineer to gather requirements and design a MySQL database for PLC/HMI systems across three production lines using AVEVA InduSoft Web Studio v8.1',
      'Researched InduSoft Web Studio (v7.1/v8.1) functionality, design creation, and database integration using official guides to support system enhancements',
      'Enabled local data transmission without internet by interfacing with a keyboardless/mouseless HMI system, connecting to a local router for PLC communication',
      'Explored cloud database integration options (AWS, Azure, Google Cloud) to enable future real-time monitoring in a French-language environment with limited site access'
    ],     
    logo: '/images/works/eco2mainpage.png',
  },
  {
    company: 'KH Stroy',
    title: 'Head Manager Assistant',
    link: 'khstroy',
    date: 'May 2022 - Aug 2022',
    description: [
      'Designed a 25-part schedule in MS Project for 21 residential buildings, coordinating 20+ subcontractors to complete concrete pouring before the rainy season, avoiding a 6-month delay',
      'Automated 120+ daily progress reports and 10+ custom Excel reports using Python (Openpyxl, Matplotlib, Pandas), achieving 90% efficiency gains across 27 construction sites',
      'Generated 10+ AutoCAD reports on pile-filling and foundation concrete, and compiled predictive reports for 1,000+ tasks to optimize project timelines',
      'Orchestrated communication between engineering teams, supervisors, and head office, creating an organization chart and presenting project outcomes to stakeholders'
    ],
    logo: '/images/works/khstroymainpage.png',
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
    <Section delay={0.1}>
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
              priority
            />
          </Box>
        </Box>
      </Box>
      </ Section>
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
            Hi, there! <br /><br />
            My name is Yerkin Tulenov. I am an electrical engineer, who is passionate about everything from nanoscale chips to full-stack applications. My favorite work lies at the intersection of design and development, particularly in creating PCBs with robust firmware, FPGA development, and VLSI designs. Whether it’s programming microcontrollers or designing analog circuits, I’m passionate about using theory knowledge in real-world applications.<br /><br />      
            Ever since I was 3 years old, I have been fascinated by the world of math. It wasn’t just a subject to me; it felt like an entirely new realm filled with endless possibilities. By the time I got to physics in 7th grade,  I realized how intuitive my understanding of how the world works truly was, and that's when my passion for engineering took off. I recently completed my Bachelor of Applied Science in Electrical Engineering at UBC. I’ve been diving into everything from circuits and control systems to signal processing, VLSI systems, and machine learning.<br /><br />
            Beyond engineering, I enjoy playing the piano, soccer, and chess, which keep my mind sharp. Kickboxing is my go-to for staying focused and pushing my limits.<br /><br />
            If you’re curious about what I’ve been up to, you can: <br /> •{"  "}Check out my {" "}
            <Link as={NextLink} href="/works" passHref scroll={false}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              Work Experience
            </Link>
            {"  "}to see what I’ve done so far; <br /> •{"  "}Explore my{' '}
            <Link as={NextLink} href="/eduleader" passHref scroll={false}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              Education Journey
            </Link>
            {"  "} at UBC; <br /> •{"  "}Dive into my {' '}
            <Link as={NextLink} href="/projects" passHref scroll={false}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              Projects
            </Link>
            { "  "} and see what I’ve been building; <br /> •{"  "}Look at my{' '}
            <Link as={NextLink} href="/courseworks" passHref scroll={false}   fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
            { "  "}Lab Reports & Coursework
            </Link>
            {"  "}  if you’re into the details; <br /> •{"  "} Read my {' '}
            <Link as={NextLink} href="/posts" passHref scroll={false}   fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              Posts
            </Link>
            { "  "} -  a mix of thoughts, ideas, and lessons learned; <br /> •{"  "} Or head to my {' '}
            <Link
              as={NextLink}
              href="https://github.com/ytulenov?tab=repositories"
              passHref
              target="_blank"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
              GitHub
            </Link> {"  "} to explore Source Codes, Designs, and Schematics (including EDA and CAD designs);
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
          <Button as={NextLink} href="/files/Yerkin_Tulenov_CV.pdf"  _hover={{
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
        Introduction to VLSI Systems, Analog Integrated Circuits, Microwave Engineering, Applied Machine Learning for Engineers, Power Electronics
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
        <Heading
    fontSize="lg"
    fontWeight="semibold"
    as="h3"
    pt={4}
    fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
    color={useColorModeValue(
      process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
      process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
    )}
  >
    Get in touch with me for collaborations, questions, offers, or just to say hi!{' '}
    
    <Link as={NextLink} href="/privacy" passHref scroll={false}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT, process.env.NEXT_PUBLIC_LINK_COLOR_DARK)}>
    View my Privacy Policy
            </Link>
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
