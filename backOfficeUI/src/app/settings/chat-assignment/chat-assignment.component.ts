import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ciw-chat-assignment',
    templateUrl: './chat-assignment.component.html',
    styleUrls: ['./chat-assignment.component.scss']
})
export class ChatAssignmentComponent implements OnInit {
    private defaultMode: string = 'auto';
    private curerntMode
    public get mode() {
        return this.curerntMode || this.defaultMode;
    }

    public set mode(value) {
        this.curerntMode = value;
        this.isDirty = this.originalValue !== value;
    }

    public originalValue: string;
    public isDirty: boolean;
    public radioValueTwo;
    public setMode(event) {
        this.mode = event;
        this.isDirty = this.originalValue !== this.mode;
    }

    public ngOnInit() {
        this.originalValue = this.mode;
    }

    public getClass(clicked: string) {
        return {
            activated: this.mode === clicked
        }
    }

    public onReset() {
        this.mode = this.originalValue;
        this.isDirty = false;
    }

    public onSave() {
        this.mode = this.originalValue;
        this.isDirty = false;
    }
}
