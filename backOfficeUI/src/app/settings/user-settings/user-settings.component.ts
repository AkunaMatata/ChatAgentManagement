import { Component, OnInit } from '@angular/core';
import { RootStateInterface } from '../../shared/state/root-state-interface';
import { Store } from '../../shared/state/store';
import { User } from '../../shared/state/user/user';

@Component({
    selector: 'user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

    private readonly store: Store<RootStateInterface>;
    public title: string = 'Users';
    public childClosed: boolean = false;

    public currentAgent: any;

    constructor(store: Store<RootStateInterface>) {
        this.store = store;
    }

    public ngOnInit() {
        let item = this.store.select(x => x.currentUser).map(x => {
            this.currentAgent = x;
        }).subscribe();
    }

    public handleCardClick() {
        this.childClosed = true;
    }
 }
