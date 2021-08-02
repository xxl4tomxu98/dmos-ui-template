import { Box, Button, HStack, Link } from '@chakra-ui/react';
import { useOktaAuth } from '@okta/okta-react';
import { Link as RouterLink } from 'react-router-dom';

export function Navigation(): JSX.Element {
  const { oktaAuth } = useOktaAuth();
  const logout = async () => {
    oktaAuth.signOut();
  };
  return (
    <Box>
      <HStack>
        <Link as={RouterLink} to={{ pathname: 'home' }}>
          Home
        </Link>
        <Link as={RouterLink} to={{ pathname: 'faq' }}>
          Faq
        </Link>
        <Button onClick={logout}>Logout</Button>
      </HStack>
    </Box>
  );
}
