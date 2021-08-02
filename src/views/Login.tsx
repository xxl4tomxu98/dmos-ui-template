import { Tokens } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignIn from '@okta/okta-signin-widget';
import { Redirect } from 'react-router-dom';
import { OktaSignInWidget } from 'src/components/OktaSignInWidget';

interface LoginProps {
  config: OktaSignIn.WidgetConfig;
}
export function Login({ config }: LoginProps): JSX.Element | null {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = (tokens: Tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err: unknown) => {
    console.log('error logging in', err);
  };

  if (!authState) return null;

  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: '/app' }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
}
