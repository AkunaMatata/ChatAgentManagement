import { Component, OnInit, OnDestroy } from '@angular/core';
import { RootStateInterface } from '../../shared/state/root-state-interface';
import { Store } from '../../shared/state/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy {
    private readonly store: Store<RootStateInterface>;
    public title: string = 'Users';
    public editMode: Observable<boolean>;

    public currentAgent: any;
    private subscribers: any[] = [];

    constructor(store: Store<RootStateInterface>) {
        this.store = store;
    }

    public ngOnInit() {
        this.subscribers.push( this.store.select(x => x.currentUser).map(x => {
            this.currentAgent = x;
        }).subscribe());
        this.editMode = this.store.select(x => x.ui.editMode);
    }

    public ngOnDestroy() {
        this.subscribers.forEach(x => x.unsubscribe());
    }
 }
