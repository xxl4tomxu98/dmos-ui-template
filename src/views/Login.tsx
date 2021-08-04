import { Button } from '@chakra-ui/react';
import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

export function Login(): JSX.Element | null {
  const location = useLocation<{ [key: string]: unknown }>();
  const currentLocationState = location.state || {
    from: { pathname: '/app' },
  };

  const { keycloak } = useKeycloak();

  const login = React.useCallback(() => {
    keycloak?.login();
  }, [keycloak]);
  const logout = React.useCallback(() => {
    keycloak?.logout();
  }, [keycloak]);

  if (keycloak?.authenticated) {
    return <Redirect to={currentLocationState?.from as string} />;
  }

  return (
    <div>
      <Button onClick={login}>Login</Button>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
