// src/components/Viewer.jsx
import React from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { Box, useColorModeValue } from '@chakra-ui/react';
import '@cyntler/react-doc-viewer/dist/index.css';

const Viewer = ({ link }) => {
  const fileUrl = link
  console.log(`Viewer: Loading file: ${fileUrl}`);

  const documents = [{ uri: fileUrl, fileType: 'docx' }];

  return (
    <Box
      my={4}
      borderRadius="0.75rem"
      border="1px solid"
      borderColor={useColorModeValue(
        process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_LIGHT,
        process.env.NEXT_PUBLIC_CODEBLOCK_MATHANDCODE_BORDER_COLOR_DARK
      )}
      boxShadow="md"
      height="850px"
      width="100%"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      position="relative"
      
    >
      <DocViewer
        documents={documents}
             pluginRenderers={DocViewerRenderers}
        className="msdoc-iframe" // Use global CSS class
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100%',
          marginRight: '20px',
          overflow: 'hidden',
          borderColor: 'transparent'
        }}
       config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
        }}
      />
    </Box>
  );
};

export default Viewer;