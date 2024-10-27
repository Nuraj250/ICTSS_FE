import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { APPLICATION_ROUTES } from './utils/app.routes';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // Start with login

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: $localize``
    },
    children: Object.values(APPLICATION_ROUTES)


  }
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
