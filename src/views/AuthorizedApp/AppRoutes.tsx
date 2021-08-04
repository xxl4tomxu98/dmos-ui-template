import { Box, Button, Spinner, Text } from '@chakra-ui/react';
import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Redirect, Route, Switch as RouterSwitch } from 'react-router-dom';
import { PageSpinner } from 'src/components/PageSpinner';
import { PrivateRoute } from 'src/components/PrivateRoute';
import {
  decrement,
  increment,
  incrementAndLog,
} from 'src/store/counter/counter.actions';
import { selectCount } from 'src/store/counter/counter.reducers';
import { fetchUser } from 'src/store/user/user.actions';
import {
  selectIsUserLoading,
  selectUserName,
} from 'src/store/user/user.reducers';
import { useAppDispatch, useAppSelector } from 'src/utils/redux-hooks';
import { Login } from '../Login';
import AuthorizedApp from './AuthorizedApp';

export function AppRoutes(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const currentCount = useAppSelector(selectCount);
  const userName = useAppSelector(selectUserName);
  const isLoading = useAppSelector(selectIsUserLoading);
  const { initialized } = useKeycloak();

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!initialized) {
    return <PageSpinner />;
  }

  const messageAndRetryBtn = (
    <>
      <Text>Name Unknown</Text>{' '}
      <Box>
        <Button onClick={() => dispatch(fetchUser())}>Retry</Button>
      </Box>
    </>
  );

  return (
    <RouterSwitch>
      <Redirect exact from='/' to='/app' />
      <PrivateRoute path='/app' component={AuthorizedApp} />
      <Route path='/login' component={Login} />
      <Route path='/counter'>
        {!isLoading ? userName ?? messageAndRetryBtn : <Spinner />}
        <br />
        {currentCount}
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(incrementAndLog())}>
          Increment and Log
        </Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </Route>
      <Route render={() => <div>not found</div>} />
    </RouterSwitch>
  );
}
