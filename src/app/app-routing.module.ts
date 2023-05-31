import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportMenuComponent } from './components/support-menu/list-support-menu/list-support-menu.component';
import { FormSupportMenuComponent } from './components/support-menu/form-support-menu/form-support-menu.component';
import { ListLocationTypeComponent } from './components/location-type/list-location-type/list-location-type.component';
import { FormLocationTypeComponent } from './components/location-type/form-location-type/form-location-type.component';
import { ListLocationComponent } from './components/location/list-location/list-location.component';
import { FormLocationComponent } from './components/location/form-location/form-location.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login-signup/login/login.component';
import { SignupComponent } from './components/login-signup/signup/signup.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Hue Festival - Login Page'}
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Hue Festival - Signup Page'}
  },
  {
    path: 'support-menu',
    component: SupportMenuComponent,
    children: [
      {
        path: 'create',
        component: FormSupportMenuComponent,
      },
      {
        path: 'update/:id',
        component: FormSupportMenuComponent,
      },
    ],
  },
  {
    path: 'location-type',
    component: ListLocationTypeComponent,
    data: { animation: 'locations'}
  },
  {
    path: 'location-type/create/',
    component: FormLocationTypeComponent,
    data: { animation: 'location'}
  }
  ,
  {
    path: 'location-type/update/:id',
    component: FormLocationTypeComponent
  },
  {
    path: 'location',
    component: ListLocationComponent,
    data: { animation: 'location1'}
  },
  {
    path: 'location/create/',
    component: FormLocationComponent
  }
  ,
  {
    path: 'location/update/:id',
    component: FormLocationComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**',
    title: 'My project - 404 Not Found',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
