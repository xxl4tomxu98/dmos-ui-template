import { useKeycloak } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import pick from 'lodash/fp/pick';
import pipe from 'lodash/fp/pipe';
import React from 'react';
import { setUserData } from 'src/store/user/user.actions';
import { UserData } from 'src/store/user/user.reducers';
import { useAppDispatch } from 'src/utils/redux-hooks';

function mapToUserData(
  obj: Pick<Keycloak.KeycloakInstance, 'token' | 'resourceAccess'>,
): UserData {
  return {
    token: obj.token ?? '',
    roles: obj.resourceAccess?.account?.roles ?? [],
  };
}
function pluckUserValuesFromKeycloak(
  keycloak: Keycloak.KeycloakInstance,
): UserData {
  return pipe(pick(['token', 'resourceAccess']), mapToUserData)(keycloak);
}

export function useSetUserData(): void {
  const { initialized, keycloak } = useKeycloak();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (initialized && keycloak.authenticated) {
      dispatch(setUserData(pluckUserValuesFromKeycloak(keycloak)));
    }
  }, [initialized, keycloak, dispatch]);
}
