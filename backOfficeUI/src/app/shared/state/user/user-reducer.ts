import { User } from './user';

export function userReducer(state = new User(), action: any): User {
    switch (action.type) {
        case 1 : {
            return  new User({firstName: 'user 1'});
        }
        default:
        return state;
    }
}
