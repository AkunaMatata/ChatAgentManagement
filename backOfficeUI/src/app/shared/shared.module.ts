import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SequentialService } from '../../infrastructure/data-access/data-providers/sequential-service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        SequentialService
    ]
})
export class SharedModule { }