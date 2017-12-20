import { EditActions } from './edit-actions';

export function editReducer(state = false , action: any): boolean {
    debugger;
    switch (action.type) {
        case EditActions.SET_EDIT_MODE : {
            return action.payload;
        }
        default:
        return state;
    }
}