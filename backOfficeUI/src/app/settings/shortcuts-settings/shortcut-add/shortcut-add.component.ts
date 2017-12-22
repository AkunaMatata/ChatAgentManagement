import { Component } from '@angular/core';

@Component({
    selector: 'ciw-shortcut-add',
    templateUrl: './shortcut-add.component.html',
    styleUrls: ['./shortcut-add.component.scss']
})
export class ShortcutAddComponent {
    public key: string;
    public value: string;
    public title: string = 'Add shortcut';

    constructor() {
    }
};
