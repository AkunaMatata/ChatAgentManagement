import { combineReducers } from 'redux';
import { userSettingReducer } from './settings/user-settings/user-settings-reducer';
import { editReducer } from './settings/shared/edit-reducer';

export const uiReducer = combineReducers({
    settings: userSettingReducer,
    editMode: editReducer
});
