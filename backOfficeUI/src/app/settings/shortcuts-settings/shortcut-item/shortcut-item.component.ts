import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ciw-shortcut-item',
    templateUrl: './shortcut-item.component.html',
    styleUrls: ['./shortcut-item.component.scss']
})
export class ShortcutItemComponent {
    private showActions: boolean;
    public get tags(): string[] {
        return _.split(_.trim(this.shortcutItem.key, '#'), '#');
    }

    public get showButtons() {
        return {
            show: this.showActions
        }
    }

    @Input()
    public shortcutItem;

    @Output()
    public remove: EventEmitter<object> = new EventEmitter();

    public toggleDelete() {
        this.showActions = true;
    }

    public onRemove() {
        console.log('deleted')
        this.remove.emit(this);
    }

    public onCancel() {
        this.showActions = false;
    }
};
