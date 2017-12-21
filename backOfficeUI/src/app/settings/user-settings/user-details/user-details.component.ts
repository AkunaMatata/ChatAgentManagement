import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { UrlConstants } from '../../../shared/constants/url-constants';
import { EditActionCreator } from '../../../shared/state/ui/settings/shared/edit-action-creator';
import { Store } from '../../../shared/state/store';
import { RootStateInterface } from '../../../shared/state/root-state-interface';

@Component({
    selector: 'ciw-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy, OnChanges {
    private readonly editActionCreator: EditActionCreator;
    private readonly store: Store<RootStateInterface>;
    public detailsForm: FormGroup;
    public title: string = 'firstname';
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: string;
    public password: string;
    public avatarUrl: string = UrlConstants.DefaultLogo;

    constructor(editActionCreator: EditActionCreator, store: Store<RootStateInterface> ) {
        this.store = store;
        this.editActionCreator = editActionCreator;
    }

    public ngOnInit() {
        this.detailsForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            role: new FormControl(null, Validators.required)
        })
        this.detailsForm.valueChanges.subscribe(data => console.log('Form changes', data));
    }

    public ngOnDestroy() {
        this.store.dispatch(this.editActionCreator.setEditMode(false));
    }

    public ngOnChanges(changes: any) {
        console.log(changes);
    }

    public onDiscard() {
        this.detailsForm.reset();
    }

    public onSave() {
        
    }
}
