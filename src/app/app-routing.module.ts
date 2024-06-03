import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';

import { AuthenticationGuard } from '@guards/authentication.guard';
import { LicenseGuard } from '@guards/license.guard';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthenticationGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        // canActivate: [LicenseGuard],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'license',
        // canActivate: [LicenseGuard],
        loadChildren: () =>
          import('./views/license/license.module').then((m) => m.LicenseModule)
      }
    ]
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./views/pages/pages.module').then((m) => m.PagesModule)
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
