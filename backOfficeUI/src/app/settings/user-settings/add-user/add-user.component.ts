import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { EditActionCreator } from '../../../shared/state/ui/settings/shared/edit-action-creator';
import { UserDetailsActionCreator } from '../../../shared/state/settings/user-settings/user-details/user-details-action-creator';
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
    private readonly userDetailsActionCreator: UserDetailsActionCreator;
    private readonly location: Location;
    public title: string = 'Add user';
    public addUserForm: FormGroup;

    constructor(
        editActionCreator: EditActionCreator,
        store: Store<RootStateInterface>,
        userDetailsActionCreator: UserDetailsActionCreator,
        location: Location) {
        this.store = store;
        this.editActionCreator = editActionCreator;
        this.userDetailsActionCreator = userDetailsActionCreator;
        this.location = location;
     }

    public ngOnInit() {
        this.addUserForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            role: new FormControl(null, Validators.required)
        })
    }

    public ngOnDestroy() {
        this.store.dispatch(this.editActionCreator.setEditMode(false));
    }

    public onDiscard() {
        this.addUserForm.reset();
    }

    public onAdd() {
        this.store.dispatchAsync(
            this.userDetailsActionCreator.createAgent(this.addUserForm.value)
        ).then(x => {this.location.back()})
    }
 }