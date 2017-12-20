import { Injectable } from '@angular/core';
import { NgControl } from '@angular/forms';
import { RadiobuttonComponent } from './radiobutton.component';

@Injectable()
export class RadiobuttonService {
    private accessorsMap: GroupToAccessorMapInterface = {};

    public add(control: NgControl, accessor: RadiobuttonComponent): void {

        if (!accessor.name) {
            throw new Error('name attribute for checkbox and for reactive form name should be specified');
        }

        if (!this.accessorsMap[accessor.name]) {
            this.accessorsMap[accessor.name] = [];
        }

        this.accessorsMap[accessor.name].push([control, accessor]);
    }

    public remove(accessor: RadiobuttonComponent): void {
        const accessorItems = this.accessorsMap[accessor.name];

        _.remove(accessorItems, item => item[1] === accessor);

        if (accessorItems.length === 0) {
            delete this.accessorsMap[accessor.name];
        }
    }

    public select(accessor: RadiobuttonComponent): void {
        const accessorItems = this.accessorsMap[accessor.name];
        accessorItems.forEach(c => {
            if (c[1] !== accessor) {
                c[1].uncheck(accessor.value);
            }
        });
    }
}

export interface GroupToAccessorMapInterface {
    [name: string]: [NgControl, RadiobuttonComponent][];
}