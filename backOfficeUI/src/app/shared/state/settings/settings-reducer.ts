import { combineReducers } from 'redux';
import { chatAssignmentReducer } from './chat-settings/chat-assignment/chat-assignment-reducer';
import { shortcutsReducer } from './chat-settings/shortcuts/shortcuts-reducer';

export const settingsReducer = combineReducers({
        shortcuts: shortcutsReducer,
        chatAssignment: chatAssignmentReducer
}
);
