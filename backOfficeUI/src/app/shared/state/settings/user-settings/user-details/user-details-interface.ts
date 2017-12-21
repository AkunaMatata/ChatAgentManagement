import { Role } from '../../../user/role';

 export interface UserDetailsInterface {
    UserId: number
    FirstName?: string;
    LastName?: string;
    Email?: string;
    Role?: Role;
}