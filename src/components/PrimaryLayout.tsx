import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

interface PrimaryLayoutProps {
  children: ReactNode;
}
export function PrimaryLayout({ children }: PrimaryLayoutProps): JSX.Element {
  return (
    <Box minH='100vh' flexDirection='column'>
      <Navigation />
      <Box flex={1} as='main'>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
