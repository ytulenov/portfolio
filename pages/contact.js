import NextLink from "next/link";
import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import Layout from "../components/layouts/article"; // Adjust path if needed
import Section from "../components/section"; // Adjust path if needed

const Contact = () => {
  return (
    <Layout>
      <Container maxW="80%" px={4}  mt={{ base: -24, md: -28 }} mb={70}>
        {/* Back to Home Link */}
        <Box mb={6}>
          <Link as={NextLink} href="/" passHref scroll={false}>
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
                textDecoration: "underline",
                color: useColorModeValue(
                  process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
                  process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
                ),
              }}
            >
              ← Back to Home
            </Button>
          </Link>
        </Box>

        <Section delay={0.1}>
          <Heading
            as="h1"
            variant="section-title"
            fontSize="3xl"
            mb={2}
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
            )}
          >
            SEND ME A MESSAGE
          </Heading>
          <Heading
            fontSize="lg"
            fontWeight="semibold"
            as="h3"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
            )}
          >
            Get in touch with me for collaborations, questions, or just to say hi!
          </Heading>

          <Box maxW="80%" mx="auto" pt={8}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted! (Add your backend logic here)");
              }}
            >
              <FormControl id="name" mb={6} isRequired>
                <FormLabel
                  fontWeight="semibold"
                  as="h3"
                  fontSize="lg"
                  color={useColorModeValue(
                    process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                    process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
                  )}
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                >
                  Name
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Your name"
                  size="lg"
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                  color={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_DARK
                  )}
                  focusBorderColor={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_DARK
                  )}
                  _placeholder={{
                    color: useColorModeValue(
                      process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT,
                      process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_DARK
                    ),
                  }}
                  bg={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_DARK
                  )}
                  borderColor={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK
                  )}
                />
              </FormControl>

              <FormControl id="email" mb={6} isRequired>
                <FormLabel
                  fontWeight="semibold"
                  as="h3"
                  fontSize="lg"
                  color={useColorModeValue(
                    process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                    process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
                  )}
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                >
                  Email
                </FormLabel>
                <Input
                  type="email"
                  placeholder="Your email"
                  size="lg"
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                  color={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_DARK
                  )}
                  _placeholder={{
                    color: useColorModeValue(
                      process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT,
                      process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_DARK
                    ),
                  }}
                  focusBorderColor={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_DARK
                  )}
                  bg={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_DARK
                  )}
                  borderColor={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK
                  )}
                />
              </FormControl>

              <FormControl id="message" mb={8} isRequired>
                <FormLabel
                  fontWeight="semibold"
                  as="h3"
                  fontSize="lg"
                  color={useColorModeValue(
                    process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
                    process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
                  )}
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                >
                  Message
                </FormLabel>
                <Textarea
                  placeholder="Your message"
                  rows={8}
                  size="lg"
                  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
                  color={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_TEXTCOLOR_DARK
                  )}
                  _placeholder={{
                    color: useColorModeValue(
                      process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_LIGHT,
                      process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_PLACEHOLDERTEXTCOLOR_DARK
                    ),
                  }}
                  focusBorderColor={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_FOCUSBORDERCCOLOR_DARK
                  )}
                  bg={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BG_DARK
                  )}
                  borderColor={useColorModeValue(
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_LIGHT,
                    process.env.NEXT_PUBLIC_MAINPAGE_CONTACTFORM_BORDERCOLOR_DARK
                  )}
                />
              </FormControl>

              <Box textAlign="center">
                <Button
                  type="submit"
                  leftIcon={<EmailIcon />}
                  fontSize="18px"
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
                  Send Message
                </Button>
              </Box>
            </form>
          </Box>
        </Section>
      </Container>
    </Layout>
  );
};

export default Contact;

export { getServerSideProps } from "../components/chakra"; // Adjust path if needed