import { Box, Button, Heading } from '@chakra-ui/react';
import { useKeycloak } from '@react-keycloak/web';
import React from 'react';

export function Home(): JSX.Element {
  const { keycloak } = useKeycloak();
  const logout = React.useCallback(() => {
    keycloak?.logout();
  }, [keycloak]);

  return (
    <Box>
      <Heading as='h1'>Startpack Homepage</Heading>
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
}
