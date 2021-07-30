import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Login } from '../Login';

const AuthorizedApp = React.lazy(() => import('./AuthorizedApp'));

interface AuthorizedRouteProps {
  basePath: string;
}
export function AuthorizedRoutes({
  basePath,
}: AuthorizedRouteProps): JSX.Element {
  const isAuthenticated = false;
  return (
    <React.Suspense fallback={<div>loading</div>}>
      {isAuthenticated ? (
        <AuthorizedApp basePath={basePath} />
      ) : (
        <>
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
          <Route path='/login'>
            <Login />
          </Route>
        </>
      )}
    </React.Suspense>
  );
}
