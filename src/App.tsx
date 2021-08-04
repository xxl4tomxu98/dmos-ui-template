import { ChakraProvider, theme } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorAlert } from './components/ErrorAlert';
import { AppRoutes } from './views/AuthorizedApp/AppRoutes';

export function App(): JSX.Element | null {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorAlert}>
        <AppRoutes />
      </ErrorBoundary>
    </ChakraProvider>
  );
}
