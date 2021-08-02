import { Redirect, Route } from 'react-router-dom';
import { PrimaryLayout } from 'src/components/PrimaryLayout';
import { Faq } from './Faq';
import { Home } from './Home';

interface AuthorizedAppProps {
  basePath: string;
}
export default function AuthorizedApp({
  basePath,
}: AuthorizedAppProps): JSX.Element {
  return (
    <PrimaryLayout>
      <Route
        path={`${basePath}`}
        exact
        render={() => <Redirect to={`${basePath}home`} />}
      />
      <Route path={`${basePath}home`}>
        <Home />
      </Route>
      <Route path={`${basePath}faq`}>
        <Faq />
      </Route>
      <Route path='*'>
        <Redirect to='/home' />
      </Route>
    </PrimaryLayout>
  );
}
