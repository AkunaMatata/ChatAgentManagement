import { ChatAssignmentActions } from './chat-assignment-actions';
import { ChatAssignmentInterface } from './chat-assignment-interface';

export function chatAssignmentReducer(state = new ChatAssignmentInterface() , action: any): ChatAssignmentInterface {
    switch (action.type) {
        case ChatAssignmentActions.SET_MODE:
            return action.payload;
        default:
            return state;
    }
};
