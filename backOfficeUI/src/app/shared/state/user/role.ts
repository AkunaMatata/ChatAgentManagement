export class Role {
    public Name: string;

    constructor(init: any = {
        Name: '',
    }) {
        this.Name = init.Name;
    }
}
