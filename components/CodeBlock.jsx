import { useState, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const CodeBlock = ({ children, className, ...props }) => {
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState(null);
  const [code, setCode] = useState('');

  // Log the raw className and props to debug
  useEffect(() => {
    console.log(`Raw className: ${className}`);
    console.log('Props:', props);
  }, [className, props]);

  // Extract language from className
  const language = className?.startsWith('language-')
    ? className.replace(/language-/, '').toLowerCase()
    : 'text'; // Default to 'text' if className is not in the expected format

  // Log the detected language
  useEffect(() => {
    console.log(`Detected language: ${language}`);
  }, [language]);

  // Load syntax highlighter dynamically
  useEffect(() => {
    import('react-syntax-highlighter').then((module) => {
      setSyntaxHighlighter(() => module.Prism);
    });
  }, []);
  const syntaxStyle = useColorModeValue(
    require('react-syntax-highlighter/dist/esm/styles/prism/coldark-cold').default,
    require('react-syntax-highlighter/dist/esm/styles/prism/shades-of-purple').default
  );
  
  // Extract code from children
  useEffect(() => {
    let extractedCode = '';
    if (typeof children === 'string') {
      extractedCode = children.trim();
    } else if (children?.props?.children) {
      extractedCode = children.props.children.trim();
    }
    setCode(extractedCode);
    console.log(`Code extracted: ${extractedCode}`);
  }, [children]);

  // Render math with KaTeX
  if (language === 'math') {
    try {
      const html = katex.renderToString(code, {
        displayMode: true,
        throwOnError: true,
        strict: false, // Allow KaTeX to be more lenient with rendering
      });
      return (
        <Box
          position="relative"
          my={4}
          p={3}
          bg={useColorModeValue(
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BG_COLOR_LIGHT,
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BG_COLOR_DARK
          )}
          borderRadius='0.75rem'
          border='1px solid'
          borderColor={useColorModeValue(
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_LIGHT,
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_DARK
          )}
          boxShadow="md"
          fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          color={useColorModeValue(
            process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
            process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
          )}
          textAlign="left" // Align content to the left (from previous request)
          fontStyle="normal" // Ensure no italic styling
        >
          <Box
            position="absolute"
            top="-12px"
            left="16px"
            bg={useColorModeValue(
              process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_LIGHT,
              process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_DARK
            )}
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
            )}
            fontSize="sm"
            fontWeight="bold"
            px={3}
            py={1}
            borderRadius="md"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            zIndex={1}
          >
            Math
          </Box>
          <pre
            style={{
              margin: 0,
              padding: 0,
              whiteSpace: 'pre-wrap',
              background: 'none',
              color: 'inherit',
              textAlign: 'left', // Ensure pre aligns left
              fontStyle: 'normal', // Remove italic styling
            }}
          >
            <span
              dangerouslySetInnerHTML={{ __html: html }}
              style={{
                display: 'block',
                textAlign: 'left',
                fontStyle: 'normal', // Remove italic styling from KaTeX output
              }}
            />
          </pre>
        </Box>
      );
    } catch (error) {
      console.error('Error rendering math with KaTeX:', error);
      return (
        <Box
          position="relative"
          my={4}
          p={3}
          bg={useColorModeValue(
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BG_COLOR_LIGHT,
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BG_COLOR_DARK
          )}
          borderRadius="lg"
          border='1px solid'
          borderColor={useColorModeValue(
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_LIGHT,
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_DARK
          )}
          boxShadow="md"
          fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          color={useColorModeValue(
            process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
            process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
          )}
          textAlign="left" // Align content to the left
          fontStyle="normal" // Ensure no italic styling
        >
          <Box
            position="absolute"
            top="-12px"
            left="16px"
            bg={useColorModeValue(
              process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BG_COLOR_LIGHT,
              process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BG_COLOR_DARK
            )}
            color={useColorModeValue(
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
              process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
            )}
            fontSize="sm"
            fontWeight="bold"
            px={3}
            py={1}
            borderRadius="md"
            zIndex={1}
          >
            Math (Error)
          </Box>
          <pre
            style={{
              margin: 0,
              padding: 0,
              whiteSpace: 'pre-wrap',
              color: 'inherit',
              textAlign: 'left', // Ensure pre aligns left
              fontStyle: 'normal', // Remove italic styling
            }}
          >
            {code}
          </pre>
        </Box>
      );
    }
  }
  // Fallback while syntax highlighter loads
  if (!SyntaxHighlighter) {
    return (
      <Box position="relative" my={4}>
        <Box
          position="absolute"
          top="-12px"
          left="16px"
          bg={useColorModeValue(
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_LIGHT,
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_DARK
          )}
          color={useColorModeValue(
            process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
            process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
          )}
          fontSize="sm"
          fontWeight="bold"
          px={3}
          py={1}
          borderRadius="md"
          zIndex={1}
        >
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </Box>
        <pre style={{ margin: 0, padding: '1.5rem' }}>{code}</pre>
      </Box>
    );
  }

  // Render code block with syntax highlighting
  return (
    <Box position="relative" my={4} borderRadius="xl" boxShadow="md" fontFamily="monospace">
      <Box
        position="absolute"
        top="-12px"
        left="16px"
        bg={useColorModeValue(
          process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_LIGHT,
          process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_DARK
        )}
        color={useColorModeValue(
          process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT,
          process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK
        )}
        fontSize="sm"
        fontWeight="bold"
        px={3}
        py={1}
        borderRadius="md"
        zIndex={1}
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
      >
        {language.charAt(0).toUpperCase() + language.slice(1)}
      </Box>
      <SyntaxHighlighter
        language={language === 'text' ? 'plaintext' : language} // Use 'plaintext' for 'text' to avoid JavaScript highlighting
        style={syntaxStyle} 
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          borderRadius: '0.75rem',
          background: useColorModeValue(
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BG_COLOR_LIGHT,
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BG_COLOR_DARK
          ),
          border: '1px solid',
          borderColor: useColorModeValue(
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_LIGHT,
            process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_DARK
          ),
          fontFamily: process.env.NEXT_PUBLIC_HEADING_H2_FONT,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeBlock;