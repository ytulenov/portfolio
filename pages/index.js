import NextLink from 'next/link';
import {Link,Container,Heading,Box,SimpleGrid,Button,List,ListItem,FormControl,FormLabel,Input,Textarea,useColorModeValue,
} from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons';


import Layout from '../components/layouts/article';
import Section from '../components/section';
import { GridItem } from '../components/grid-item';
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5';
import {FaCode,FaServer,FaCloud,FaLock,FaChartBar,FaMusic,FaCamera,FaJs,FaNodeJs,FaReact,FaDocker,FaGitAlt,FaDatabase,FaSearch,FaStripe,FaMapMarkedAlt,FaAws,FaPaintBrush,FaBrain,
} from 'react-icons/fa';
import Image from 'next/image';
import WorkExperience from '../components/workexperiencemainpage';

const SkillCard = ({ title, icon, skills }) => {
  const bgColor = useColorModeValue('#000000', '#faf7f0');
  const textColor = useColorModeValue('white', '#0f051a');

  return (
    <Box
      p={4}
      borderRadius="2xl"
      bg={bgColor}
      boxShadow="md"
      textAlign="center"
      transition="all 0.2s"
      _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
    >
      <Box fontSize="4xl" mb={2} color={useColorModeValue('gray.600', 'white')}>
        {icon} {/* Category icon color can be controlled here */}
      </Box>
      <Heading fontSize="3xl" fontWeight="semibold" color={textColor}>
        {title}
      </Heading>
      <List mt={2} spacing={1}>
        {skills.map((skill, index) => {
          const { icon: skillIcon, color } = skillIcons[skill] || {
            icon: <FaServer />,
            color: '#555555', // Fallback gray
          };
          return (
            <ListItem
              key={index}
              fontSize="lg"
              color={textColor}
              display="flex"
              alignItems="center"
            >
              <Box mr={2} fontSize="lg" color={color}>
                {skillIcon}
              </Box>
              {skill}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};


const skillIcons = {
  TypeScript: { icon: <FaJs />, color: '#3178C6' }, // TypeScript blue
  JavaScript: { icon: <FaJs />, color: '#F7DF1E' }, // JavaScript yellow
  'Node.js': { icon: <FaNodeJs />, color: '#339933' }, // Node.js green
  React: { icon: <FaReact />, color: '#61DAFB' }, // React cyan
  'React Native': { icon: <FaReact />, color: '#61DAFB' }, // Same as React
  'Next.js': { icon: <FaReact />, color: '#000000' }, // Next.js black
  Serverless: { icon: <FaCloud />, color: '#FD5750' }, // Serverless red-orange
  Docker: { icon: <FaDocker />, color: '#2496ED' }, // Docker blue
  Nginx: { icon: <FaServer />, color: '#009639' }, // Nginx green
  Terraform: { icon: <FaServer />, color: '#7B42BC' }, // Terraform purple
  Git: { icon: <FaGitAlt />, color: '#F05032' }, // Git orange
  MongoDB: { icon: <FaDatabase />, color: '#47A248' }, // MongoDB green
  Elasticsearch: { icon: <FaSearch />, color: '#00C8B5' }, // Elasticsearch teal
  Redis: { icon: <FaDatabase />, color: '#DC382D' }, // Redis red
  MySQL: { icon: <FaDatabase />, color: '#4479A1' }, // MySQL blue
  PostgreSQL: { icon: <FaDatabase />, color: '#336791' }, // PostgreSQL blue
  SQLite: { icon: <FaDatabase />, color: '#003B57' }, // SQLite dark blue
  Stripe: { icon: <FaStripe />, color: '#635BFF' }, // Stripe purple
  Firebase: { icon: <FaDatabase />, color: '#FFCA28' }, // Firebase yellow
  Fitbit: { icon: <FaLock />, color: '#00B0B9' }, // Fitbit teal
  Twilio: { icon: <FaCloud />, color: '#F22F46' }, // Twilio red
  'Google Maps': { icon: <FaMapMarkedAlt />, color: '#4285F4' }, // Google blue
  'In-app Payments': { icon: <FaLock />, color: '#000000' }, // Generic black
  OAuth2: { icon: <FaLock />, color: '#000000' }, // Generic black
  Keycloak: { icon: <FaLock />, color: '#000000' }, // Generic black
  PassportJS: { icon: <FaLock />, color: '#34E27A' }, // Passport.js green
  'Firebase Auth': { icon: <FaLock />, color: '#FFCA28' }, // Firebase yellow
  'AWS Certified Solutions Architect': { icon: <FaAws />, color: '#FF9900' }, // AWS orange
  Cognito: { icon: <FaAws />, color: '#FF9900' }, // AWS orange
  CloudWatch: { icon: <FaAws />, color: '#FF9900' }, // AWS orange
  'Lambda Functions': { icon: <FaAws />, color: '#FF9900' }, // AWS orange
  CloudFront: { icon: <FaAws />, color: '#FF9900' }, // AWS orange
  VPC: { icon: <FaAws />, color: '#FF9900' }, // AWS orange
  LocalStack: { icon: <FaAws />, color: '#FF9900' }, // AWS orange
  'Firebase Analytics': { icon: <FaChartBar />, color: '#FFCA28' }, // Firebase yellow
  Redash: { icon: <FaChartBar />, color: '#FF5733' }, // Redash orange-red
  'IP Addressing': { icon: <FaServer />, color: '#555555' }, // Generic gray
  Routing: { icon: <FaServer />, color: '#555555' }, // Generic gray
  HTTP: { icon: <FaServer />, color: '#555555' }, // Generic gray
  'TCP/IP': { icon: <FaServer />, color: '#555555' }, // Generic gray
  'Socket Programming': { icon: <FaServer />, color: '#555555' }, // Generic gray
  Art: { icon: <FaPaintBrush />, color: '#FF69B4' }, // Hot pink
  Music: { icon: <FaMusic />, color: '#800080' }, // Purple
  Drawing: { icon: <FaPaintBrush />, color: '#FF69B4' }, // Hot pink
  Photography: { icon: <FaCamera />, color: '#000000' }, // Black
  Leica: { icon: <FaCamera />, color: '#FF0000' }, // Leica red
  'Machine Learning': { icon: <FaBrain />, color: '#00CED1' }, // Turquoise
};

const experiences = [
  {
    company: 'Tesla',
    title: 'React Native Developer',
    date: 'Jan 2021 - Feb 2022',
    description: [
      'Developed and maintained web applications using React.js and other related technologies.',
      'Collaborated with cross-functional teams including designers, product managers, and developers.',
      'Implemented responsive design and ensured cross-browser compatibility.',
      'Participated in code reviews and provided constructive feedback to other developers.',
    ],
    logo: 'bosk.png',
  },
  {
    company: 'Starbucks',
    title: 'React.js Developer',
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

const Home = () => (
  <Layout>
    <Container maxW="80%" px={4} pt={28} >
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
        <Heading as="h1" fontSize="3xl" variant="section-title" pt={14} mb={2} fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
          ABOUT
        </Heading>
        <Box ml={0}>
          <Heading
            fontSize="lg"
            fontWeight="semibold"
            as="h3"
            lineHeight="1.5"
            m={0}
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
            , and finally access the source code, designs and schematics — including EDA and CAD designs —{' '}
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
            My portfolio
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
        <Heading as="h1" variant="section-title" fontSize="3xl" pt={14}fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
          EDUCATION
        </Heading>
        
          <Heading fontSize="lg" mt={2} fontWeight="semibold" as="h3"  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
            Sep 2021-Jun 2025 Electrical Engineering at the University of British Columbia, Kelowna.
            Related Coursework: Transcript Button:
          </Heading>
        
      </Section>

      <WorkExperience experiences={experiences} />

      <Section delay={0.3}>
  <Heading as="h1" variant="section-title" fontSize="3xl" py={14}fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
    SKILLS
  </Heading>
  <SimpleGrid columns={[1, 2, 3]} spacing={6}>
    <SkillCard
      title="Programming and Frameworks"
      icon={<FaCode />}
      skills={['TypeScript', 'JavaScript', 'Node.js', 'React', 'React Native', 'Next.js', 'Serverless']}
    />
    <SkillCard
      title="DevOps"
      icon={<FaServer />}
      skills={['Docker', 'Nginx', 'Terraform', 'Git']}
    />
    <SkillCard
      title="Data Storage and Caching"
      icon={<FaDatabase />}
      skills={['MongoDB', 'Elasticsearch', 'Redis', 'MySQL', 'PostgreSQL', 'SQLite']}
    />
    <SkillCard
      title="Integrations"
      icon={<FaLock />}
      skills={['Stripe', 'Firebase', 'Fitbit', 'Twilio', 'Google Maps', 'In-app Payments', 'OAuth2', 'Keycloak', 'PassportJS', 'Firebase Auth']}
    />
    <SkillCard
      title="AWS and Cloud"
      icon={<FaAws />}
      skills={['AWS Certified Solutions Architect', 'Cognito', 'CloudWatch', 'Lambda Functions', 'CloudFront', 'VPC', 'LocalStack']}
    />
    <SkillCard
      title="Analytics and Reporting"
      icon={<FaChartBar />}
      skills={['Firebase Analytics', 'Redash']}
    />
    <SkillCard
      title="Networking"
      icon={<FaServer />}
      skills={['IP Addressing', 'Routing', 'HTTP', 'TCP/IP', 'Socket Programming']}
    />
    <SkillCard
      title="Creative Skills"
      icon={<FaMusic />}
      skills={['Art', 'Music', 'Drawing', 'Photography', 'Leica', 'Machine Learning']}
    />
  </SimpleGrid>
</Section>

      
      <Section delay={0.3}>
        <Heading as="h1" variant="section-title" fontSize="3xl" pt={8}fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
          SEND ME A MESSAGE TO CONTACT
        </Heading>
        <Heading fontSize="lg" fontWeight="semibold" as="h3"  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}>
          Get in touch with me for collaborations, questions, or just to say hi!
        </Heading>
        <Box maxW="80%" mx="auto" pt={8}>
        <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted! (Add your backend logic here)');
            }}
          >
            <FormControl id="name" mb={6} isRequired>
            <FormLabel fontWeight="semibold" as="h3" fontSize="lg"   color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>Name</FormLabel>
              <Input
                type="text"
                placeholder="Your name"
                size="lg"
                
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_DARK)} // Text color
                focusBorderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_DARK)}
                _placeholder={{ color: useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT,process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_DARK) }} // Placeholder style
                bg={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_DARK)}
                borderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK)}
              />
            </FormControl>

            <FormControl id="email" mb={6} isRequired>
            <FormLabel fontWeight="semibold" as="h3" fontSize="lg" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}    fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>Email</FormLabel>
              <Input
                type="email"
                placeholder="Your email"
                size="lg"
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_DARK)} // Text color
                _placeholder={{ color: useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT,process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_DARK) }} // Placeholder style
                focusBorderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_DARK)}
                bg={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_DARK)}
                borderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK)}
              />
            </FormControl>
            <FormControl id="message" mb={8} isRequired>
              <FormLabel fontWeight="semibold" as="h3" fontSize="lg" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}    fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>Message</FormLabel>
              <Textarea
                placeholder="Your message"
                rows={8}
                size="lg"
                fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                color={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_DARK)} // Text color
                _placeholder={{ color: useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT,process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_DARK) }} // Placeholder style
                focusBorderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_DARK)}
                bg={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_DARK)}
                borderColor={useColorModeValue(process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT, process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK)}
              />
            </FormControl>
            <Box textAlign="center">
              <Button
                type="submit"
                leftIcon={<EmailIcon />}
                fontSize="18px" fontWeight="bold" borderRadius='md'  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)} color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
                _hover={{
                  bg: useColorModeValue(
                    process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
                    process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
                  ),}}
              >
                Send Message
              </Button>
            </Box>
          </form>
</Box>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'