import { createReducer } from '../helpers/reducerCreator';
import { REHYDRATE } from 'redux-persist';
import UserProfile from '../../model/UserProfile';

export const UPDATE_USER_PROFILE = 'userProfile/UPDATE_USER_PROFILE';
export type UserProfileData = Partial<UserProfile>;

// Definition of actions listeners
const UserProfileStore = createReducer(new UserProfile(), {
  [REHYDRATE](state: UserProfile, action) {
      if (action.payload && action.payload.UserProfileStore) {
        return new UserProfile(action.payload.UserProfileStore);
      }
      return state;
    },
  [UPDATE_USER_PROFILE](state: UserProfile, action) {
    let newState = new UserProfile(state);
    let newValues: UserProfileData = action.data;
    newState.updateProfile(newValues);
    return newState;
  }
});

export default UserProfileStore;