import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ciw-shortcut-control',
    templateUrl: './shortcut-control.component.html',
    styleUrls: ['./shortcut-control.component.scss']
})
export class ShortcutControlComponent {
    @Input()
    public name: string;

    @Output()
    public delete: EventEmitter<string> = new EventEmitter();

    public onDelete(): void {
        this.delete.emit(this.name);
    }
}