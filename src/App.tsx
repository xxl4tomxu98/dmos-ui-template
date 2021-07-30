import { ChakraProvider, theme } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Switch as RouterSwitch,
} from 'react-router-dom';
import { AuthorizedRoutes } from './views/AuthorizedApp/AuthorizedRoutes';

export function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <RouterSwitch>
          <Route
            path='/'
            render={({ match }) => <AuthorizedRoutes basePath={match.path} />}
          />
        </RouterSwitch>
      </Router>
    </ChakraProvider>
  );
}
