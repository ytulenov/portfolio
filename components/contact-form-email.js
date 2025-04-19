import * as React from 'react';

const ContactFormEmail = ({ name, email, subject, message }) => {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://ytulenov.com' : 'http://localhost:3000';

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Thank You for Your Message</title>
        <style>
          {`
            @media only screen and (max-width: 600px) {
              .container { padding: 20px !important; }
              .button { padding: 10px 16px !important; font-size: 14px !important; }
              .social-icon { width: 20px !important; height: 20px !important; }
            }
          `}
        </style>
      </head>
      <body
        style={{
          backgroundColor: '#f4f4f9',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: '16px',
          margin: 0,
          padding: 0,
          color: '#333333',
        }}
      >
        {/* Header */}
        

        {/* Main Content */}
        <div
          style={{
            backgroundColor: '#ffffff',
            maxWidth: '600px',
            margin: '20px auto',
            padding: '30px',
            paddingTop: "20px",
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '500',
              margin: '0 0 20px',
              color: '#1a1a1a',
            }}
          >
            Hello {name},
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px' }}>
            Thank you for contacting me! I’ve received your message and will get back to you as soon as possible. Below is
            a summary of your submission:
          </p>
          <div
            style={{
              backgroundColor: '#f9f9f9',
              padding: '15px',
              borderRadius: '6px',
              marginBottom: '20px',
            }}
          >
            <p style={{ fontSize: '15px', margin: '0 0 10px' }}>
              <strong>Email:</strong> {email}
            </p>
            <p style={{ fontSize: '15px', margin: '0 0 10px' }}>
              <strong>Subject:</strong> {subject}
            </p>
            <p style={{ fontSize: '15px', margin: '0' }}>
              <strong>Message:</strong> {message}
            </p>
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px' }}>
            In the meantime, feel free to explore my website to learn more about my work and projects.
          </p>
          <div style={{ textAlign: 'center' }}>
            <a
              href={baseUrl}
              style={{
                display: 'inline-block',
                backgroundColor: '#007bff',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Visit My Website
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div
          style={{
            textAlign: 'center',            
            backgroundColor: '#ffffff',
            maxWidth: '600px',
            margin: '20px auto',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p
            style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 15px',
              color: '#1a1a1a',
            }}
          >
            Connect with Me
          </p>
          <div>
            {/* Social media links with optional images */}
            <a
              href="https://www.linkedin.com/in/ytulenov"
              style={{ display: 'inline-block', margin: '0 10px', textDecoration: 'none' }}
            >
              {/* Uncomment if images are verified */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/3536/3536569.png"
                width="24"
                height="24"
                alt="LinkedIn"
                style={{ verticalAlign: 'middle' }}
              /> 
             
            </a>
            <a
              href="https://github.com/ytulenov?tab=repositories"
              style={{ display: 'inline-block', margin: '0 10px', textDecoration: 'none' }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25657.png"
                width="24"
                height="24"
                alt="GitHub"
                style={{ verticalAlign: 'middle' }}
              /> 
             
            </a>
            <a
              href="mailto:ytulenov@gmail.com"
              style={{ display: 'inline-block', margin: '0 10px', textDecoration: 'none' }}
            >
               <img
                src="https://cdn-icons-png.flaticon.com/512/831/831357.png"
                width="24"
                height="24"
                alt="Email"
                style={{ verticalAlign: 'middle' }}
              /> 
              
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            fontSize: '12px',
            color: '#666666',
          }}
        >
          <p style={{ margin: '0' }}>© {new Date().getFullYear()} Yerkin Tulenov. All Rights Reserved.</p>
          <p style={{ margin: '5px 0 0' }}>
            <a href={`${baseUrl}/privacy`} style={{ color: '#666666', textDecoration: 'underline' }}>
              Privacy Policy
            </a>
          </p>
        </div>
      </body>
    </html>
  );
};

export default ContactFormEmail;