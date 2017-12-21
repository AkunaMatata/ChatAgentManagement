import { UserDetailsActions } from './user-details-actions';
import { UserDetailsInterface } from './user-details-interface';

const initialState: UserDetailsInterface = {
    UserId: undefined,
    Email: undefined,
    FirstName: undefined,
    LastName: undefined,
    Role: undefined
}
export function userDetailsReducer(state = initialState , action: any): UserDetailsInterface {
    switch (action.type) {
        case UserDetailsActions.CLEAR_USER_DETAIL:
            return initialState;
        case UserDetailsActions.LOAD_USER_DETAIL:
            return action.payload;
        default:
            return state;
    }
};