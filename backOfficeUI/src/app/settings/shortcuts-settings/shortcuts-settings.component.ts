import { Component, OnInit } from '@angular/core';
import { RootStateInterface } from '../../shared/state/root-state-interface';
import { Store } from '../../shared/state/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ciw-shortcut-settings',
    templateUrl: './shortcuts-settings.component.html',
    styleUrls: ['./shortcuts-settings.component.scss']
})
export class ShortcutSettingsComponent implements OnInit {
    private readonly store: Store<RootStateInterface>;
    public title: string = 'Shortcuts';
    public editMode: Observable<boolean>;

    constructor(store: Store<RootStateInterface>) {
        this.store = store;
    }

    ngOnInit() {
        this.editMode = this.store.select(store => store.ui.editMode);
    }
 }