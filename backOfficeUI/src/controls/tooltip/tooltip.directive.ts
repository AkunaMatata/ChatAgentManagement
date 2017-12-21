import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({ selector: '[showTooltip]' })
export class ShowTooltipDirective {

    @Input()
    public showTooltip: TooltipComponent;

    @Input()
    public onlyEllipsis = true;

    constructor(private element: ElementRef) {
        this.element = element;
    }

    @HostListener('mouseenter') onMouseEnter() {
        let element = this.element.nativeElement;
        // This condition is a fix for IE / Edge rounding issues, which may cause
        // unexpected appearing of tooltip.
        if (Math.abs(element.offsetWidth - element.scrollWidth) > 1 || !this.onlyEllipsis) {
            this.showTooltip.setVisibility(true);
        }
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.showTooltip.setVisibility(false);
    }
}