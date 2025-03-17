// components/CodeBlock.jsx
import { useState, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const CodeBlock = ({ children, className }) => {
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState(null);
  const [code, setCode] = useState('');
  const language = className?.replace(/language-/, '') || 'javascript';

  // Load syntax highlighter dynamically
  useEffect(() => {
    import('react-syntax-highlighter').then((module) => {
      setSyntaxHighlighter(() => module.Prism);
    });
  }, []);

  // Extract code from children
  useEffect(() => {
    if (typeof children === 'string') {
      setCode(children.trim());
    } else if (children?.props?.children) {
      setCode(children.props.children.trim());
    }
  }, [children]);

  // Render math with KaTeX (dark gray background, white text, no highlighting)
  if (language.toLowerCase() === 'math') {
    try {
      const html = katex.renderToString(code, {
        displayMode: true,
        throwOnError: false,
      });
      return (
        <Box
          position="relative"
          my={4}
          p={3}
          bg={useColorModeValue(process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_LIGHT, process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_DARK)}
          borderRadius="lg"
          boxShadow="md"
          fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        >
          <Box
            position="absolute"
            top="-12px"
            left="16px"
            bg={useColorModeValue(process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_LIGHT, process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_DARK)}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
            fontSize="sm"
            fontWeight="bold"
            px={3}
            py={1}
            borderRadius="md"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            zIndex={1}
          >
            {language}
          </Box>
          <pre style={{ margin: 0, padding: 0, whiteSpace: 'pre-wrap', background: 'none', color: 'inherit' }}>
            <span dangerouslySetInnerHTML={{ __html: html }} />
          </pre>
        </Box>
      );
    } catch (error) {
      console.error('Error rendering math:', error);
      return (
        <Box
          position="relative"
          my={4}
          mb={4}
          p={3}
          bg={useColorModeValue(process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_LIGHT, process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_DARK)}
          borderRadius="lg"
          boxShadow="md"
          fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
          color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        >
          <Box
            position="absolute"
            top="-12px"
            left="16px"
            bg={useColorModeValue(process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_LIGHT, process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_DARK)}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
            fontSize="sm"
            fontWeight="bold"
            px={3}
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            py={1}
            borderRadius="md"
            zIndex={1}
          >
            {language}
          </Box>
          <pre style={{ margin: 0, padding: 0, whiteSpace: 'pre-wrap', color: 'inherit' }}>{code}</pre>
        </Box>
      );
    }
  }

  // Fallback while syntax highlighter loads
  if (!SyntaxHighlighter) {
    return <pre>{code}</pre>;
  }

  // Render JavaScript block with syntax highlighting (IDE-like style)
  return (
    <Box position="relative" my={4} bg="#1A202C" borderRadius="xl" boxShadow="md" fontFamily="monospace">
      <Box
        position="absolute"
        top="-12px"
        left="16px"
        bg={useColorModeValue(process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_LIGHT, process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_LANGUAGEHEADER_BG_COLOR_DARK)}
        color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        fontSize="sm"
        fontWeight="bold"
        px={3}
        py={1}
        borderRadius="md"
        zIndex={1}
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
      >
        {language}
      </Box>
      <SyntaxHighlighter
        language={language}
        style={require('react-syntax-highlighter/dist/esm/styles/prism/night-owl').default}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          borderRadius: '0.75rem',
          background: useColorModeValue(process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BG_COLOR_LIGHT, process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BG_COLOR_DARK),
          border: '1px solid',
          fontFamily: process.env.NEXT_PUBLIC_HEADING_H2_FONT,
          borderColor: useColorModeValue(process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_LIGHT, process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_DARK)
        }}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeBlock;