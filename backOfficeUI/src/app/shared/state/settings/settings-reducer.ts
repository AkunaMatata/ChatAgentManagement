import { combineReducers } from 'redux';
import { chatAssignmentReducer } from './chat-settings/chat-assignment/chat-assignment-reducer';
import { shortcutsReducer } from './chat-settings/shortcuts/shortcuts-reducer';
import { userSettingsReducer } from './user-settings//user-settings-reducer';

export const settingsReducer = combineReducers({
    shortcuts: shortcutsReducer,
    chatAssignment: chatAssignmentReducer,
    userSettings: userSettingsReducer
});
