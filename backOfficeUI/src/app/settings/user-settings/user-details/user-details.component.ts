import { Component, OnDestroy } from '@angular/core';
import { EditActionCreator } from '../../../shared/state/ui/settings/shared/edit-action-creator';
import { Store } from '../../../shared/state/store';
import { RootStateInterface } from '../../../shared/state/root-state-interface';

@Component({
    selector: 'ciw-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnDestroy {
    private readonly editActionCreator: EditActionCreator;
    private readonly store: Store<RootStateInterface>;
    public title: string = 'firstname';
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: string;
    public password: string;
    public avatarUrl: string;

    constructor(editActionCreator: EditActionCreator, store: Store<RootStateInterface> ) {
        this.store = store;
        this.editActionCreator = editActionCreator;
     }
    public ngOnDestroy() {
        this.store.dispatch(this.editActionCreator.setEditMode(false));
    }
}
