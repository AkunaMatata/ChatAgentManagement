import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SettingsModule } from '../settings/settings.module';
import { LeftNavigationModule } from './left-navigation/left-navigation.module';

@NgModule(
    {
        imports: [
            LeftNavigationModule, RouterModule, CommonModule, SettingsModule
        ],
        declarations: [LayoutComponent],
        exports: [LeftNavigationModule, LayoutComponent]
    })

export class LayoutModule {}