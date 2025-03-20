import NextLink from 'next/link';
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
  useToast,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema } from '../lib/schemas'; // Adjust path if needed
import Layout from '../components/layouts/article';
import Section from '../components/section';

const Contact = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

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
      <Container maxW="80%" px={4} mt={{ base: -24, md: -28 }} mb={70}>
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
                textDecoration: 'underline',
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="name" mb={6} isRequired isInvalid={!!errors.name}>
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
                  {...register('name')}
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
                {errors.name && (
                  <Box color="red.500" mt={2} fontSize="sm">
                    {errors.name.message}
                  </Box>
                )}
              </FormControl>

              <FormControl id="email" mb={6} isRequired isInvalid={!!errors.email}>
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
                  {...register('email')}
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
                {errors.email && (
                  <Box color="red.500" mt={2} fontSize="sm">
                    {errors.email.message}
                  </Box>
                )}
              </FormControl>

              <FormControl id="subject" mb={6} isRequired isInvalid={!!errors.subject}>
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
                  Subject
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Your subject"
                  size="lg"
                  {...register('subject')}
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
                {errors.subject && (
                  <Box color="red.500" mt={2} fontSize="sm">
                    {errors.subject.message}
                  </Box>
                )}
              </FormControl>

              <FormControl id="message" mb={8} isRequired isInvalid={!!errors.message}>
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
                  {...register('message')}
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
  );
};

export default Contact;

export { getServerSideProps } from '../components/chakra';