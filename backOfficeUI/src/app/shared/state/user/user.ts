import { Role } from './role';

export class User {
    public UserId: number;
    public FirstName: string;
    public LastName: string;
    public Email: string;
    public Role: Role[];

    constructor(init: any = {
        UserId: undefined,
        FirstName: '',
        LastName: '',
        Email: '',
        Role: undefined,
    }) {
        this.UserId = init.UserId;
        this.FirstName = init.FirstName;
        this.LastName = init.LastName;
        this.Email = init.Email;
        this.Role = init.Role;
    }
}
