import { combineReducers } from 'redux';
import { chatAssignmentReducer } from './chat-assignment/chat-assignment-reducer';
import { shortcutsReducer } from './shortcuts/shortcuts-reducer';

export const chatSettingsReducer = combineReducers({
    shortcuts: shortcutsReducer,
    chatAssignment: chatAssignmentReducer,
});