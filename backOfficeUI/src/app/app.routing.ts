import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'settings', pathMatch: 'full'
},
{
    path: '**',
    redirectTo: 'settings'
},
  // { path: '', component: HomeComponent },
  // { path: 'about', component: AboutComponent}
];

export const routing = RouterModule.forRoot(routes);
