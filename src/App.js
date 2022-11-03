import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Input,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const handleSubmit = async () => {
    const response = await axios.get(
      `http://localhost:8080/content?url=${url}`
    );
    setText(response.data);
  };
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Input
              placeholder="Link to article"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onSubmit={handleSubmit}
            />
            <Button onClick={handleSubmit}>Submit</Button>
            <Text>{text}</Text>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
