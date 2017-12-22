import { UserListActions } from './user-list-actions';
import { UserCardInterface } from './user-card-interface';

const initialState: UserCardInterface = {
    UserId: undefined,
    Email: undefined,
    Status: undefined,
}

export function userListReducer(state = [] , action: any): UserCardInterface[] {
    switch (action.type) {
        case UserListActions.LOAD_USER_LIST:
        return action.payload;
        default:
            return state;
    }
};