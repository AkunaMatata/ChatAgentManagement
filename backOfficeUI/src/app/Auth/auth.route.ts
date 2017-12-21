// import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const AuthRoute = RouterModule.forRoot([
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent}
]);
