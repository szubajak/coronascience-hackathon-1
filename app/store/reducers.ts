import { combineReducers } from 'redux';
import MiDataServiceStore from './midataService/reducer';
import UserProfileService from './userProfile/reducer';

// Combine all reducers :
const store = Object.assign({},
    { MiDataServiceStore },
    { UserProfileService }
);
export default combineReducers(store);
export type AppStore = typeof store;
