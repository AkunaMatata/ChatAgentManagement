import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { ApiEndpoints } from '../../constants/api-endpoints';

@Injectable()
export class UserLoader {
    private readonly http: Http;

    /**
     * Creates an instance of CurrentUserLoader.
     * @param {Http} http
     */
    constructor(http: Http) {
        this.http = http;
    }

    /**
     * Loads a current user.
     */
    public load(root: any): Promise<User> {
        return Promise.resolve(new User({FirstName: 'first', Email: 'email@email.email'}))
        // return this.http
        //     .get(`${root}/${ApiEndpoints.CurrentUser}`, { withCredentials: true })
        //     .toPromise()
        //     .then(userResponse => new User(userResponse.json()));
    }
}
