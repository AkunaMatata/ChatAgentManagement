import { combineReducers } from 'redux';
import { uiReducer } from './ui/ui-reducer';
import { userReducer } from './user/user-reducer';
import { settingsReducer } from './settings/settings-reducer';

export const rootReducer = combineReducers({
    ui: uiReducer,
    currentUser: userReducer,
    settings: settingsReducer
});
