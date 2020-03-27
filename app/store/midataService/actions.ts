import Action from '../helpers/Action';
import { UPDATE_USER_AUTHENTICATION, UserAuthenticationData, LOGOUT_AUTHENTICATE_USER } from './reducer';

export function authenticateUser(dispatch, accessToken: string, accessTokenExpirationDate: string, refreshToken: string) {
    var actionData: UserAuthenticationData = {
        accessToken,
        accessTokenExpirationDate,
        refreshToken
    };
    dispatch(new Action(UPDATE_USER_AUTHENTICATION, actionData).getObjectAction());
}

export function logoutUser(dispatch) {
    dispatch(new Action(LOGOUT_AUTHENTICATE_USER).getObjectAction());
}
