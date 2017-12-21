import { UserDetailsActions } from './user-details/user-details-actions';
import { UserSettings } from './user-settings'

const initialState: UserSettings = {
    selectedAgent: {
        UserId: undefined,
        Email: undefined,
        FirstName: undefined,
        LastName: undefined,
        Role: undefined
    },
    currentUserList: []
}
export function userSettingsReducer(state = initialState , action: any): UserSettings {
    switch (action.type) {
        case UserDetailsActions.CLEAR_USER_DETAIL:
            return initialState;
        case UserDetailsActions.LOAD_USER_DETAIL:
            return { ...state, selectedAgent: action.payload };
        default:
            return state;
    }
};