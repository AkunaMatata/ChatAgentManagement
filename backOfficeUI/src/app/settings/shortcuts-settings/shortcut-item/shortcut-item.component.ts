import { Component } from '@angular/core';

@Component({
    selector: 'ciw-shortcut-item',
    templateUrl: './shortcut-item.component.html',
    styleUrls: ['./shortcut-item.component.scss']
})
export class ShortcutItem {
    public key: string;
    public value: string;
};
