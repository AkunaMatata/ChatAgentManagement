import { Component } from '@angular/core';

@Component({
    selector: 'ca-tooltip',
    template: `
    <div class="ca-tooltip" [ngClass]="{ 'ca-tooltip--visible': show }">
        <div class="ca-tooltip__pointer"></div>
        <ng-content></ng-content> 
    </div> 
    `,
})
export class TooltipComponent {
    public show: boolean = false;

    setVisibility(visibility: boolean): void {
        this.show = visibility;
    }
}