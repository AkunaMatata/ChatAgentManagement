import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EditActionCreator } from '../../../shared/state/ui/settings/shared/edit-action-creator';
import { Store } from '../../../shared/state/store';
import { RootStateInterface } from '../../../shared/state/root-state-interface';

@Component({
    selector: 'ciw-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
    private readonly editActionCreator: EditActionCreator;
    private readonly store: Store<RootStateInterface>;
    private readonly router: Router;
    public title: string = 'Add user';

    constructor(editActionCreator: EditActionCreator, store: Store<RootStateInterface>, router: Router ) {
        this.store = store;
        this.editActionCreator = editActionCreator;
        this.router = router;
     }

    public ngOnInit() {
    }

    public ngOnDestroy() {
        this.store.dispatch(this.editActionCreator.setEditMode(false));
    }
 }