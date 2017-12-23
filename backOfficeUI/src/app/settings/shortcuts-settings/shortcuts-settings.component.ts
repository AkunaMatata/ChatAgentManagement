import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShortcutsActionCreator } from '../../shared/state/settings/chat-settings/shortcuts/shortcuts-action-creator';
import { RootStateInterface } from '../../shared/state/root-state-interface';
import { Store } from '../../shared/state/store';
@Component({
    selector: 'ciw-shortcut-settings',
    templateUrl: './shortcuts-settings.component.html',
    styleUrls: ['./shortcuts-settings.component.scss']
})
export class ShortcutSettingsComponent implements OnInit {
    private readonly store: Store<RootStateInterface>;
    private readonly shortcutsActionCreator: ShortcutsActionCreator;

    public title: string = 'Shortcuts';
    public editMode: Observable<boolean>;
    public shortcuts: Observable<object>;

    constructor(store: Store<RootStateInterface>, shortcutsActionCreator: ShortcutsActionCreator) {
        this.store = store;
        this.shortcutsActionCreator = shortcutsActionCreator;
    }

    ngOnInit() {
        this.editMode = this.store.select(store => store.ui.editMode);
        this.shortcuts = this.store.select(store => store.settings.chatSettings.shortcuts);
    }

    public onRemove(item) {
        this.store.dispatch(this.shortcutsActionCreator.removeShortcuts(item))
    }
 }