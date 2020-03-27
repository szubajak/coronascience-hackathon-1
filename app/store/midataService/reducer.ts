import { createReducer } from '../helpers/reducerCreator';
import MiDataService from './model';
import { REHYDRATE } from 'redux-persist';

export const UPDATE_USER_AUTHENTICATION = 'miDataService/UPDATE_USER_AUTHENTICATION';
export type UserAuthenticationData = {accessToken: string, accessTokenExpirationDate: string, refreshToken: string};

export const LOGOUT_AUTHENTICATE_USER = 'miDataService/LOGOUT_AUTHENTICATE_USER';

// Definition of actions listeners
const MiDataServiceStore = createReducer(new MiDataService(), {
  [REHYDRATE](state: MiDataService, action) {
      if (action.payload && action.payload.MiDataServiceStore) {
        return new MiDataService(action.payload.MiDataServiceStore);
      }
      return state;
    },
  [UPDATE_USER_AUTHENTICATION](state: MiDataService, action) {
    let newState = new MiDataService(state);
    let newValues: UserAuthenticationData = action.data;
    newState.authenticateUser(newValues.accessToken, newValues.accessTokenExpirationDate, newValues.refreshToken);
    return newState;
  },
  [LOGOUT_AUTHENTICATE_USER](state: MiDataService) {
    let newState = new MiDataService(state);
    newState.logoutUser();
    return newState;
  }
});

export default MiDataServiceStore;