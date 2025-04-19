import { Container, Heading, Box, Text, Button, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import Layout from '../components/layouts/article';
import Section from '../components/section';

const Privacy = () => {
  return (
    <Layout>
      <Container maxW="80%" px={4} mt={{ base: -24, md: -28 }}>
        {/* Back to Home Link */}
        <Box mb={4}>
          <NextLink href="/" passHref>
            <Button
              mx={{ base: -3, md: -4 }}
              fontSize="md"
              variant="ghost"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              color={useColorModeValue(
                process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT,
                process.env.NEXT_PUBLIC_BUTTON_BG_DARK
              )}
              _hover={{
                textDecoration: 'underline',
                color: useColorModeValue(
                  process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
                  process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
                ),
              }}
            >
              ← Back to Home
            </Button>
          </NextLink>
        </Box>

        <Section delay={0.1}>
          <Heading
            as="h1"
            fontSize="3xl"
            variant="section-title"
            mb={6}
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
            )}
          >
            Privacy Policy
          </Heading>

          <Box
            fontSize="lg"
            lineHeight="1.6"
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
            )}
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          >
            <Text mb={4}>
              This Privacy Policy explains how I collect, use, disclose, and safeguard your information when you visit my website. Please read this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
            </Text>

            <Heading as="h2" fontSize="xl" mb={4} fontWeight="semibold">
              1. Information I Collect
            </Heading>
            <Text mb={2}>
              I may collect information about you in various ways, including:
            </Text>
            <Box as="ul" pl={6} mb={4} listStyleType="disc">
              <Box as="li">
                <strong>Personal Data:</strong> Information such as your name, email address, and other details you provide when contacting me through the contact form.
              </Box>
              <Box as="li">
                <strong>Usage Data:</strong> Information about how you interact with our website, such as your IP address, browser type, and pages visited.
              </Box>
              <Box as="li">
                <strong>Cookies:</strong> I may use cookies and similar tracking technologies to enhance your experience. You can manage cookie preferences through your browser settings.
              </Box>
            </Box>

            <Heading as="h2" fontSize="xl" mb={4} fontWeight="semibold">
              2. How I Use Your Information
            </Heading>
            <Text mb={2}>
              I may use the information I collect for purposes including:
            </Text>
            <Box as="ul" pl={6} mb={4} listStyleType="disc">
              <Box as="li">Responding to your inquiries and providing support.</Box>
              <Box as="li">Improving my website and services.</Box>
              <Box as="li">Analyzing website usage to enhance user experience.</Box>
              <Box as="li">Sending communications, such as responses to your messages, if you have opted in.</Box>
            </Box>

            <Heading as="h2" fontSize="xl" mb={4} fontWeight="semibold">
              3. Sharing Your Information
            </Heading>
            <Text mb={2}>
              I do not sell, trade, or otherwise transfer your personal information to third parties except in the following cases:
            </Text>
            <Box as="ul" pl={6} mb={4} listStyleType="disc">
              <Box as="li">
                With service providers who assist me in operating my website (e.g., email services for contact form submissions).
              </Box>
              <Box as="li">When required by law or to protect my rights.</Box>
            </Box>

            <Heading as="h2" fontSize="xl" mb={4} fontWeight="semibold">
              4. Data Security
            </Heading>
            <Text mb={4}>
              I implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure, and I cannot guarantee absolute security.
            </Text>

            <Heading as="h2" fontSize="xl" mb={4} fontWeight="semibold">
              5. Your Rights
            </Heading>
            <Text mb={2}>
              Depending on your location, you may have the following rights regarding your personal data:
            </Text>
            <Box as="ul" pl={6} mb={4} listStyleType="disc">
              <Box as="li">Access, correct, or delete your personal information.</Box>
              <Box as="li">Object to or restrict the processing of your data.</Box>
              <Box as="li">Request a copy of your data in a portable format.</Box>
            </Box>
            <Text mb={4}>
              To exercise these rights, please contact me using the{' '}
              <NextLink href="/contact" passHref>
                <Text
                  as="span"
                  color={useColorModeValue(
                    process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT,
                    process.env.NEXT_PUBLIC_LINK_COLOR_DARK
                  )}
                  _hover={{ textDecoration: 'underline' }}
                >
                  contact form
                </Text>
              </NextLink>.
            </Text>

            <Heading as="h2" fontSize="xl" mb={4} fontWeight="semibold">
              6. Third-Party Links
            </Heading>
            <Text mb={4}>
              My website may contain links to third-party sites. I am not responsible for the privacy practices or content of these sites. I encourage you to review their privacy policies.
            </Text>

            <Heading as="h2" fontSize="xl" mb={4} fontWeight="semibold">
              7. Changes to This Privacy Policy
            </Heading>
            <Text mb={4}>
              I may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. I encourage you to review this policy periodically.
            </Text>

            <Heading as="h2" fontSize="xl" mb={4} fontWeight="semibold">
              8. Contact Me
            </Heading>
            <Text mb={4}>
              If you have questions about this Privacy Policy, please reach out via my{' '}
              <NextLink href="/contact" passHref>
                <Text
                  as="span"
                  color={useColorModeValue(
                    process.env.NEXT_PUBLIC_LINK_COLOR_LIGHT,
                    process.env.NEXT_PUBLIC_LINK_COLOR_DARK
                  )}
                  _hover={{ textDecoration: 'underline' }}
                >
                  contact form
                </Text>
              </NextLink>.
            </Text>

            <Text fontStyle="italic" mt={6}>
              Last Updated: April 19, 2025
            </Text>
          </Box>
        </Section>
      </Container>
    </Layout>
  );
};

export default Privacy;