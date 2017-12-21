import { UserDetailsInterface } from './user-details/user-details-interface';
import { UserCardInterface } from './user-list/user-card-interface';

export interface UserSettings {
    selectedAgent: UserDetailsInterface
    currentUserList: UserCardInterface[]
}