import { combineReducers } from 'redux';
import { userSettingReducer } from './settings/user-settings/user-settings-reducer';

export const uiReducer = combineReducers({
    settings: userSettingReducer
});
