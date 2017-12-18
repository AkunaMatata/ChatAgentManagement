export function userSettingReducer(state = 0, action: any): number {
    switch (action.type) {
        case 1 : {
            return 1;
        }
        default:
        return state;
    }
}
