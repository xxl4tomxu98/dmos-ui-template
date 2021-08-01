import { ChakraProvider, theme } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  BrowserRouter as Router,
  Route,
  Switch as RouterSwitch,
} from 'react-router-dom';
import { ErrorAlert } from './components/ErrorAlert';
import { AuthorizedRoutes } from './views/AuthorizedApp/AuthorizedRoutes';

export function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorAlert}>
        <Router>
          <RouterSwitch>
            <Route
              path='/'
              render={({ match }) => <AuthorizedRoutes basePath={match.path} />}
            />
          </RouterSwitch>
        </Router>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
