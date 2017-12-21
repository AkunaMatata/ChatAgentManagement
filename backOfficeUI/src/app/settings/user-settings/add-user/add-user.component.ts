import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
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
    private readonly location: Location;
    public title: string = 'Add user';
    public addUserForm: FormGroup;

    constructor(
        editActionCreator: EditActionCreator,
        store: Store<RootStateInterface>,
        router: Router,
        location: Location) {
        this.store = store;
        this.editActionCreator = editActionCreator;
        this.router = router;
        this.location = location;
     }

    public ngOnInit() {
        this.addUserForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            role: new FormControl(null, Validators.required)
        })
        this.addUserForm.valueChanges.subscribe(data => console.log('Form changes', data));
    }

    public ngOnDestroy() {
        this.store.dispatch(this.editActionCreator.setEditMode(false));
    }

    public onDiscard() {
        this.addUserForm.reset();
    }

    public onAdd() {
        this.location.back();
    }
 }