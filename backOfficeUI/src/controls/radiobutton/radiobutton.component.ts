import { Component, Input, Output, HostBinding, EventEmitter, forwardRef,
    Renderer2, ElementRef, Injector, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl }   from '@angular/forms';
import { RadiobuttonService } from './radiobutton.service';

export const CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadiobuttonComponent), // tslint:disable-line
    multi: true
};

@Component({
    selector: 'ciw-radiobutton',
    templateUrl: './radiobutton.component.html',
    styleUrls: ['./radiobutton.component.scss'],
    providers: [CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR]
})
export class RadiobuttonComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private checked: boolean;
    @HostBinding('class.ca-disabled') @Input() public disabled: boolean = false;
    @HostBinding('class.ciw-radiobutton') @Input() public hostClass: boolean = true;
    @HostBinding('class.ciw-selected') public get selectClass() {
        return this.checked;
    };

    @Input() public id: string;
    @Input() public name: string;
    @Input() public value: any;
    @Input() public formControlName: string;
    @Input() public tabindex: number = 0;

    @Output() public onChange: EventEmitter<any> = new EventEmitter();

    public control: NgControl;
    public focused: boolean = false;

    constructor(
        private readonly renderer: Renderer2,
        private readonly elementRef: ElementRef,
        private readonly registry: RadiobuttonService,
        private readonly injector: Injector
    ) { }
    public onModelTouched: Function = () => { return; };
    public onModelChange: Function = () => { return; };

    public ngOnInit(): void {
        this.control = this.injector.get(NgControl, null);
        this.checkName();
        this.registry.add(this.control, this);
    }

    public ngOnDestroy(): void {
        this.registry.remove(this);
    }

    public handleChange(): void {
        this.updateModel();
    }

    public uncheck(value: any): void {
        this.writeValue(value);
    }

    public setDisabledState(isDisabled: boolean): void {
        const element = this.getElement();
        if (element) {
            this.renderer.setProperty(element, 'disabled', isDisabled);
        }
    }

    public onBlur(): void {
        this.onModelTouched();
    }

    public onFocus(): void {
        this.focused = true;
    }

    public writeValue(value: string): void {
        const element = this.getElement();
        this.checked = this.value === value
        if (element) {
            if (this.checked) {
                this.renderer.addClass(element, 'selected');
            } else {
                this.renderer.removeClass(element, 'selected');
            }
            this.renderer.setProperty(element, 'checked', this.value === value);
        }
    }

    public registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    public registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    private updateModel(): void {
        this.registry.select(this);
        this.writeValue(this.value);
        this.onModelChange(this.value);
        this.onChange.emit(this.value);
    }

    private getElement(): any {
        return _.head($(this.elementRef.nativeElement).find('input').get());
    }

    private checkName(): void {
        if (this.name && this.formControlName && this.name !== this.formControlName) {
            this.throwNameError();
        }

        if (!this.name && this.formControlName) {
            this.name = this.formControlName;
        }
    }

    private throwNameError(): void {
        throw new Error(`
      If you define both a name and a formControlName attribute on your radio button, their values
      must match. Ex: <input type="radio" formControlName="food" name="food">
    `);
    }
}