import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoute } from './auth.route';

@NgModule({
    imports: [
        RouterModule,
        FormsModule ,
        AuthRoute,
        BrowserModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule {}
