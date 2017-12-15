import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'settings', pathMatch: 'full'
  },
  {
      path: '**',
      redirectTo: 'settings'
  }
];

export const routing = RouterModule.forRoot(routes);
