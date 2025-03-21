import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  const baseUrl = 'https://ytulenov.com'; 
  
  const ContactFormEmail = ({ name, email, subject, message }) => {
    return (
      <Html>
        <Head />
        <Preview>Thank You for Your Email</Preview>
        <Body
          style={{
            backgroundColor: '#fafbfb',
            fontFamily: 'sans-serif',
            fontSize: '16px',
            margin: 0,
            padding: 0,
          }}
        >
          <Container
            style={{
              backgroundColor: '#ffffff',
              padding: '45px',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <Heading
              style={{
                textAlign: 'center',
                margin: 0,
                lineHeight: 1.5,
                fontSize: '24px',
              }}
            >
              Thank You for Your Email
            </Heading>
  
            <Section>
              <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
                Hi {name},<br />
                Thank you for reaching out! I appreciate your message and will respond as soon as possible. Here’s a recap of the message you sent:
              </Text>
              <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
                <strong>Email:</strong> {email}<br />
                <strong>Subject:</strong> {subject}<br />
                <strong>Message:</strong> {message}
              </Text>
            </Section>
  
            <Section style={{ textAlign: 'center' }}>
              <Text style={{ fontSize: '16px', marginTop: '20px', marginBottom: '20px' }}>
                In the meantime, feel free to explore my website to discover more about my work!
              </Text>
              <Button
                href={baseUrl}
                style={{
                  backgroundColor: '#2250f4',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '12px 18px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  fontWeight: 'bold',
                }}
              >
                Go Back to My Website
              </Button>
            </Section>
  
            
            <Section style={{ marginTop: '45px', textAlign: 'center' }}>
              <Text style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>
                Connect with me:
              </Text>
  
            
              <Section
                style={{
                  textAlign: 'center', 
                }}
              >
                <Link
                  href="https://www.linkedin.com/in/ytulenov"
                  style={{
                    display: 'inline-block',
                    margin: '0 12px', 
                  }}
                >
                  <Img
                    src={`${baseUrl}/icons/linkedin.png`}
                    width="24"
                    height="24"
                    alt="LinkedIn"
                    style={{ display: 'inline-block' }}
                  />
                </Link>
                <Link
                  href="https://github.com/ytulenov?tab=repositories"
                  style={{
                    display: 'inline-block',
                    margin: '0 12px', 
                  }}
                >
                  <Img
                    src={`${baseUrl}/icons/github.png`}
                    width="24"
                    height="24"
                    alt="GitHub"
                    style={{ display: 'inline-block' }}
                  />
                </Link>
                <Link
                  href="mailto:ytulenov@gmail.com"
                  style={{
                    display: 'inline-block',
                    margin: '0 12px', 
                  }}
                >
                  <Img
                    src={`${baseUrl}/icons/email.png`}
                    width="24"
                    height="24"
                    alt="Email"
                    style={{ display: 'inline-block' }}
                  />
                </Link>
              </Section>
  
              <Text style={{ color: '#666666', marginTop: '20px', fontSize: '14px' }}>
                © {new Date().getFullYear()} Yerkin Tulenov. All Rights Reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  export default ContactFormEmail;