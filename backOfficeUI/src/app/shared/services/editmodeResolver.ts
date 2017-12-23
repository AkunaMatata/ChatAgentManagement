import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EditActionCreator } from '../state/ui/settings/shared/edit-action-creator';
import { RootStateInterface } from '../state/root-state-interface';
import { Store } from '../state/store';

/**
 * Resolver used to lookup current user details
 */
@Injectable()
export class EditModeResolver implements Resolve<boolean> {
    private store: Store<RootStateInterface>;
    private actionCreator: EditActionCreator;

    constructor(store: Store<RootStateInterface>, actionCreator: EditActionCreator) {
        this.store = store;
        this.actionCreator = actionCreator;
    }

    /**
     * Resolves current user details
     * @param route Route snapshot
     * @param state State snapshot
     * @returns Observable instance of User
     */
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |
        Promise<boolean> | boolean {
        return  this.store.dispatch(this.actionCreator.setEditMode(true))
    }
}