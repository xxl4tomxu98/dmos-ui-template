import { Tokens } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import React from 'react';

interface OktaSignInWidgetProps {
  config: OktaSignIn.WidgetConfig;
  onSuccess: (_tokens: Tokens) => void;
  onError: (..._args: unknown[]) => void;
}
export function OktaSignInWidget({
  config,
  onSuccess,
  onError,
}: OktaSignInWidgetProps): JSX.Element {
  const widgetRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!widgetRef.current) return;

    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current as unknown as string,
      })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, [config, onSuccess, onError]);

  return <div ref={widgetRef} />;
}
