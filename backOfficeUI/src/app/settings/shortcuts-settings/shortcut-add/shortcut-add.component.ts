import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { EditActionCreator } from '../../../shared/state/ui/settings/shared/edit-action-creator';
import { ShortcutsActionCreator } from '../../../shared/state/settings/chat-settings/shortcuts/shortcuts-action-creator';
import { Store } from '../../../shared/state/store';
import { RootStateInterface } from '../../../shared/state/root-state-interface';

@Component({
    selector: 'ciw-shortcut-add',
    templateUrl: './shortcut-add.component.html',
    styleUrls: ['./shortcut-add.component.scss']
})
export class ShortcutAddComponent implements OnDestroy {
    private readonly store: Store<RootStateInterface>;
    private readonly editActionCreator: EditActionCreator;
    private readonly shortcutsActionCreator: ShortcutsActionCreator;
    private readonly location: Location;
    private isActive: boolean;
    public key: string;
    public value: string;
    public title: string = 'Add shortcut';
    @ViewChild('f') public form;
    public list= [];

    public  get focused() {
        return {
            focused: this.isActive
        }
    }

    public get disabled() {
        return !this.value || this.list.length <= 0;
    }

    constructor(editActionCreator: EditActionCreator,
        store: Store<RootStateInterface>,
        location: Location,
        shortcutsActionCreator: ShortcutsActionCreator) {
        this.store = store;
        this.editActionCreator = editActionCreator;
        this.location = location;
        this.shortcutsActionCreator = shortcutsActionCreator;
    }

    public ngOnDestroy(): void {
        this.store.dispatch(this.editActionCreator.setEditMode(false));
    }



    public createShortcut(): void {
        if (this.key) {
            this.list.push(this.key)
            this.form.controls['key'].setValue('');
        }
    }

    public delete(event): void {
        this.list = _.filter(this.list, x => x !== event);
    }

    public onClick() {
        this.isActive = true;
    }

    public onBlur() {
        this.isActive = false;
        this.createShortcut();
    }

    public onDiscard(): void {
        this.location.back();
    }

    public onSave() {
        let shortcut = {value: this.value, key: '#' + _.join(this.list, '#') }
        this.store.dispatch(this.shortcutsActionCreator.addShortcuts(shortcut));
        this.location.back();
    }
};
