import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeftNavigationComponent } from './left-navigation.component';

@NgModule(
    {
        imports: [
            RouterModule
        ],
        declarations: [
            LeftNavigationComponent],
        exports: [
            LeftNavigationComponent,
            ]
    })
export class LeftNavigationModule {}