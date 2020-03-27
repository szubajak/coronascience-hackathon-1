import { combineReducers } from 'redux';
import MiDataServiceStore from './midataService/reducer';

// Combine all reducers :
const store = Object.assign({},
    { MiDataServiceStore },
);
export default combineReducers(store);
export type AppStore = typeof store;
