import { ChakraProvider, theme } from '@chakra-ui/react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { ErrorAlert } from './components/ErrorAlert';
import { oktaAuthConfig } from './config';
import { AuthorizedRoutes } from './views/AuthorizedApp/AuthorizedRoutes';

const oktaAuth = new OktaAuth(oktaAuthConfig);
export function App(): JSX.Element | null {
  const history = useHistory();
  const customAuthHandler = (): void => {
    history?.push('/login');
  };
  const restoreOriginalUri = async (
    _oktaAuth: unknown,
    originalUri: string,
  ) => {
    history?.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <ChakraProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorAlert}>
          <Router>
            <AuthorizedRoutes />
          </Router>
        </ErrorBoundary>
      </ChakraProvider>
    </Security>
  );
}
