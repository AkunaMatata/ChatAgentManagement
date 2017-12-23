import { combineReducers } from 'redux';
import { userSettingsReducer } from './user-settings/user-settings-reducer';
import { chatSettingsReducer } from './chat-settings/chat-settings-reducer';

export const settingsReducer = combineReducers({
    chatSettings: chatSettingsReducer,
    userSettings: userSettingsReducer
});
