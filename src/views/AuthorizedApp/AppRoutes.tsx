import { useKeycloak } from '@react-keycloak/web';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch as RouterSwitch,
} from 'react-router-dom';
import { PageSpinner } from 'src/components/PageSpinner';
import { PrivateRoute } from 'src/components/PrivateRoute';
import { Login } from '../Login';
import AuthorizedApp from './AuthorizedApp';

export function AppRoutes(): JSX.Element | null {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <PageSpinner />;
  }
  return (
    <Router>
      <RouterSwitch>
        <Redirect exact from='/' to='/app' />
        <PrivateRoute path='/app' component={AuthorizedApp} />
        <Route path='/login' component={Login} />
        <Route render={() => <div>not found</div>} />
      </RouterSwitch>
    </Router>
  );
}
