import { useState, useEffect, useRef } from 'react';
import { Box, Text, Flex, IconButton, Link, useColorModeValue } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import SyntaxHighlighter from 'react-syntax-highlighter'; 
import { xcode, atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyIcon, DownloadIcon } from '@chakra-ui/icons';


const MaximizeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h6v2H6v4H4zM20 4h-6v2h4v4h2zM4 20h6v-2H6v-4H4zM20 20h-6v-2h4v-4h2z" />
    </svg>
  );
  
  const MinimizeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16" />
    </svg>
  );
  

const GitHubRepoBrowser = ({ repoUrl }) => {
  const syntaxStyle = useColorModeValue(xcode, atomOneDark);
  const [tree, setTree] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState(new Set()); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPath, setCurrentPath] = useState(''); 
  const [isFullPage, setIsFullPage] = useState(false); 
  const treeRef = useRef(null);
  const contentRef = useRef(null);

  const parseRepoUrl = (url) => {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)(?:\/tree\/([^/]+))?/);
    if (!match) throw new Error('Invalid GitHub repository URL');
    const [, owner, repo, branch = 'main'] = match;
    return { owner, repo, branch };
  };

  const fetchRepoContents = async (path = '') => {
    try {
      setLoading(true);
      setError(null);
      const { owner, repo, branch } = parseRepoUrl(repoUrl);
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
      
      
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          
          
        },
      });
      
      if (!response.ok) {
        if (response.status === 403) { 
          throw new Error('GitHub API rate limit exceeded. Please use a Personal Access Token or wait.');
        } else if (response.status === 404) {
          throw new Error('Repository or path not found.');
        } else {
          throw new Error(`Failed to fetch repository contents: ${response.status} ${response.statusText}`);
        }
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const sortedTree = data.map(item => ({
          name: item.name,
          path: item.path,
          type: item.type,
          url: item.download_url || item.html_url,
          children: item.type === 'dir' ? [] : undefined, 
        })).sort((a, b) => {
          if (a.type === 'dir' && b.type === 'file') return -1;
          if (a.type === 'file' && b.type === 'dir') return 1;
          return a.name.localeCompare(b.name);
        });
        setTree(prevTree => updateTree(prevTree, path, sortedTree));
      } else {
        setTree([]);
      }
      setCurrentPath(path || '');
    } catch (err) {
      setError(`Error loading repository: ${err.message}`);
      
    } finally {
      setLoading(false);
    }
  };

  
  const updateTree = (prevTree, path, items) => {
    if (!path) return items;
    const pathParts = path.split('/').filter(Boolean);
    let current = prevTree;

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      let found = current.find(item => item.name === part && item.type === 'dir');
      if (!found) {
        found = { name: part, path: pathParts.slice(0, i + 1).join('/'), type: 'dir', children: [] };
        current.push(found);
      }
      current = found.children || [];
    }
    
    
    const existingItems = new Set(current.map(item => item.path));
    const uniqueItems = items.filter(item => !existingItems.has(item.path));
    current.push(...uniqueItems);
    
    return [...prevTree]; 
  };

  const fetchFileContent = async (fileUrl) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Failed to fetch file content');
      const text = await response.text();
      setSelectedFileContent(text);
    } catch (err) {
      setError(`Error loading file: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleFolder = (path) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
        fetchRepoContents(path);
      }
      return newSet;
    });
    setCurrentPath(path); 
    setSelectedItem({ path, type: 'dir' });
    setSelectedFileContent(null); 
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (item.type === 'file') {
      fetchFileContent(item.url);
    } else if (item.type === 'dir') {
      toggleFolder(item.path);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullPage = () => {
    setIsFullPage(!isFullPage);
  };

  const renderTree = (items, level = 0) => {
    return items
      .sort((a, b) => {
        if (a.type === 'dir' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'dir') return 1;
        return a.name.localeCompare(b.name);
      })
      .map(item => (
        <div key={item.path} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '200px' }}>
          <Flex
            align="center"
            p={2}
            pl={level * 5} 
            bg={selectedItem?.path === item.path ? useColorModeValue(process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_LIGHT, process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_DARK) : 'transparent'}
            borderRadius="md"
            _hover={{ bg: useColorModeValue(process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_LIGHT, process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_DARK) }}
            cursor="pointer"
            onClick={() => handleItemClick(item)}
          >
            {item.type === 'dir' ? (
              expandedFolders.has(item.path) ? <ChevronDownIcon mr={2} /> : <ChevronRightIcon mr={2} />
            ) : (
              <Text mr={2}>📄</Text>
            )}
            <Text fontSize="sm"  fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT} color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} isTruncated>{item.name}</Text>
          </Flex>
          {item.type === 'dir' && expandedFolders.has(item.path) && item.children && item.children.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {renderTree(item.children, level + 1)}
            </div>
          )}
        </div>
      ));
  };

  useEffect(() => {
    fetchRepoContents();
  }, [repoUrl]);

  if (loading) return <Text>Loading repository...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  const { owner, repo, branch } = parseRepoUrl(repoUrl);
  const height = isFullPage ? '100vh' : '600px';
  const width = '100%'; 

  return (
    <Box
      bg={useColorModeValue(process.env.NEXT_PUBLIC_OVERALL_BG_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
      borderRadius={isFullPage ? '0' : 'xl'} 
      boxShadow={isFullPage ? 'none' : 'md'} 
      p={isFullPage ? '4' : '4'} 
      w={width} 
      h={height} 
      overflow="hidden"
      border={isFullPage ? 'none' : '1px solid'}
      borderColor={isFullPage ? 'none' : useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK) } // Remove border in full-page mode
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
      color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      position={isFullPage ? 'fixed' : 'relative'} 
      top={isFullPage ? '0' : 'auto'} 
      left={isFullPage ? '0' : 'auto'} 
      zIndex={isFullPage ? '1000' : 'auto'} 
    >
      <Flex direction="column" h="100%">
        
        <Flex mb={2} align="center" wrap="wrap" maxW="100%">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPath('');
              setExpandedFolders(new Set());
              setSelectedItem(null);
              setSelectedFileContent(null);
            }}
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
            color={useColorModeValue(process.env.NEXT_PUBLIC_GITHUBREPO_LINKONTOP_COLOR_LIGHT, process.env.NEXT_PUBLIC_GITHUBREPO_LINKONTOP_COLOR_DARK)}
            fontSize="sm"
            mr={2}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {`${owner}/${repo}/tree/${branch}/`}
          </Link>
          {currentPath.split('/').filter(Boolean).map((part, index, parts) => (
            <Link
              key={part}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const newPath = parts.slice(0, index + 1).join('/');
                fetchRepoContents(newPath);
                setExpandedFolders(new Set([newPath])); 
                setSelectedItem({ path: newPath, type: 'dir' }); 
                setSelectedFileContent(null); 
              }}
              size="xs"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              variant="link"
              color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)}
              mr={1}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {part}/
            </Link>
          ))}
          <IconButton
            icon={isFullPage ? <MinimizeIcon /> : <MaximizeIcon />}
            onClick={toggleFullPage}
            aria-label={isFullPage ? 'Minimize to normal size' : 'Expand to full page'}
            size="sm"
            ml="auto" 
            bg={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_BG_LIGHT, process.env.NEXT_PUBLIC_BUTTON_BG_DARK)} color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
            _hover={{
              bg: useColorModeValue(
                process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_LIGHT,
                process.env.NEXT_PUBLIC_BUTTON_HOVER_BG_DARK
              ),}}
          />
        </Flex>

        <Flex direction="row" h={`calc(100% - 40px)`}>
         
          <Box w="30%" overflowX="auto" overflowY="auto" borderRight="1px solid" borderColor={useColorModeValue(process.env.NEXT_PUBLIC_GITHUBREPO_LINESEPARATIONBETWEEN_RIGHT_AND_LEFT_WINDOWS_COLOR_LIGHT, process.env.NEXT_PUBLIC_GITHUBREPO_LINESEPARATIONBETWEEN_RIGHT_AND_LEFT_WINDOWS_COLOR_DARK)} ref={treeRef}>
                <Text fontSize="lg"  color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontWeight="bold" mb={2} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
                    Repository Browser
                </Text>
                <div style={{ minWidth: 'max-content' }}>
                    {renderTree(tree)}
                </div>
                </Box>

         
          <Box w="70%" overflowY="auto" p={4} ref={contentRef}>
            {selectedItem && (
              <Flex align="center" justify="space-between" mb={2}>
                <Text fontSize="lg" fontWeight="bold" color={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)} fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}>
                  {selectedItem.path} {selectedItem.type === 'dir' ? '(Folder)' : '(File)'}
                </Text>
                {selectedItem.type === 'file' && selectedFileContent && (
                  <Flex>
                    <IconButton
                      icon={<CopyIcon />}
                      onClick={() => copyToClipboard(selectedFileContent)}
                      aria-label="Copy code"
                      size="sm"
                      mr={2}
                      bg={useColorModeValue(process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_LIGHT, process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_DARK)} color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
                      _hover={{
                        bg: useColorModeValue(
                          process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_HOVER_LIGHT,
                          process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_HOVER_DARK
                        ),}}
                    />
                    <IconButton
                      icon={<DownloadIcon />}
                      onClick={() => downloadFile(selectedItem.url, selectedItem.name)}
                      aria-label="Download file"
                      size="sm"
                      bg={useColorModeValue(process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_LIGHT, process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_DARK)} color={useColorModeValue(process.env.NEXT_PUBLIC_BUTTON_TEXT_LIGHT, process.env.NEXT_PUBLIC_BUTTON_TEXT_DARK)}
                      _hover={{
                        bg: useColorModeValue(
                          process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_HOVER_LIGHT,
                          process.env.NEXT_PUBLIC_GITHUBREPO_BUTTONCOLOR_FOR_COPYANDDOWNLOAD_HOVER_DARK
                        ),}}
                    />
                  </Flex>
                )}
              </Flex>
            )}
            {selectedFileContent ? (
              <SyntaxHighlighter
                language={selectedItem.name.endsWith('.ts') || selectedItem.name.endsWith('.tsx') ? 'typescript' : 'javascript'} 
                style={syntaxStyle} 
                wrapLines
                showLineNumbers
              >
                {selectedFileContent}
              </SyntaxHighlighter>
            ) : selectedItem && selectedItem.type === 'dir' ? (
              <Text>Select a file to view its contents</Text>
            ) : (
              <Text>No folder or file selected</Text>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default GitHubRepoBrowser;