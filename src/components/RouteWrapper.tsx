import { ReactNode } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  layout: ReactNode;
}
export function ProtectedRouteWrapper({
  children,
  ...rest
}: ProtectedRouteProps & RouteProps): JSX.Element {
  const isAuthenticated = true;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
