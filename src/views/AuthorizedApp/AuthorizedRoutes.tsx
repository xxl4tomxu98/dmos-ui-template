import { Spinner } from '@chakra-ui/react';
import { LoginCallback, useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Redirect, Route, Switch as RouterSwitch } from 'react-router-dom';
import { oktaSignInConfig } from 'src/config';
import { Login } from '../Login';

const AuthorizedApp = React.lazy(() => import('./AuthorizedApp'));

export function AuthorizedRoutes(): JSX.Element | null {
  const { authState } = useOktaAuth();
  return (
    <RouterSwitch>
      <Route
        path='/app'
        render={({ match }) =>
          authState?.isAuthenticated ? (
            <React.Suspense fallback={<Spinner />}>
              <AuthorizedApp basePath={match.path} />
            </React.Suspense>
          ) : (
            <Redirect to='/login' />
          )
        }
      />
      <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
      <Route path='/login/callback' component={LoginCallback} />
      <Route path='*'>
        <Redirect to='/login' />
      </Route>
    </RouterSwitch>
  );
}
