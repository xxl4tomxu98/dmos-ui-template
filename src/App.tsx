import {
  Box,
  ChakraProvider,
  Code,
  Grid,
  Link,
  Text,
  theme,
  VStack,
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Route,
  Switch as RouterSwitch,
} from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Home } from './Home/Home';
import { Logo } from './Logo';

function Intro(): JSX.Element {
  return (
    <VStack spacing={8}>
      <Logo h='40vmin' pointerEvents='none' />
      <Text>
        Edit <Code fontSize='xl'>src/App.tsx</Code> and save to reload.
      </Text>
      <Link
        color='teal.500'
        href='https://chakra-ui.com'
        fontSize='2xl'
        target='_blank'
        rel='noopener noreferrer'
      >
        Learn Chakra
      </Link>
      <Link as={RouterLink} to='/home'>
        <Text>Go to home</Text>
      </Link>
    </VStack>
  );
}
export const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <Router>
      <Box textAlign='center' fontSize='xl'>
        <Grid minH='100vh' p={3}>
          <ColorModeSwitcher justifySelf='flex-end' />
          <RouterSwitch>
            <Route exact path='/'>
              <Intro />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
          </RouterSwitch>
        </Grid>
      </Box>
    </Router>
  </ChakraProvider>
);
