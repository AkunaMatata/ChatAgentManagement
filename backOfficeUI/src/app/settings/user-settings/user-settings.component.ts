import { Component } from '@angular/core';

@Component({
    selector: 'user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {

    public title: string = 'Users';
    public childClosed: boolean = false;

    constructor() {
    }

    public handleCardClick() {
        this.childClosed = true;
    }
 }