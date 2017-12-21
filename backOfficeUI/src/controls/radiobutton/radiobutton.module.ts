import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadiobuttonComponent } from './radiobutton.component';
import { RadiobuttonService } from './radiobutton.service';

@NgModule({
    imports: [FormsModule],
    declarations: [
        RadiobuttonComponent
    ],
    exports: [
        RadiobuttonComponent,
    ],
    providers: [
        RadiobuttonService
    ]
})
export class RadiobuttonModule {}