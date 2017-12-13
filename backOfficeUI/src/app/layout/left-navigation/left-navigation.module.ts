import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopSideNavigationComponent } from './top-side-navigation/top-side-navigation.component';
import { BottomSideBarNavigationComponent } from './bottom-side-navigation/bottom-side-navigation.component';
import { LeftNavigationComponent } from './left-navigation.component';

@NgModule(
    {
        imports: [
            RouterModule
        ],
        declarations: [
            TopSideNavigationComponent,
            BottomSideBarNavigationComponent,
            LeftNavigationComponent],
        exports: [
            LeftNavigationComponent,
            TopSideNavigationComponent,
            BottomSideBarNavigationComponent
            ]
    })
export class LeftNavigationModule {}