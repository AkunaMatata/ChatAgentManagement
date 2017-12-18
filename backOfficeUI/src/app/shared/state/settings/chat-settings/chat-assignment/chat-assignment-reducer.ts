import { ChatAssignmentActions } from './chat-assignment-actions';
import { ChatAssignmentInterface } from './chat-assignment-interface';

/**
 * notification counter reducer
 * @param state current state
 * @param action Dispatched action.
 * @return next state of notification counter.
 */
export function chatAssignmentReducer(state = {}, action: any): ChatAssignmentInterface {
    switch (action.type) {
        case ChatAssignmentActions.SET_MODE:
            return action.payload;
        default:
            return state;
    }
};
