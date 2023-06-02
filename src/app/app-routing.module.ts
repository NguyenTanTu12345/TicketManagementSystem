import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login-signup/login/login.component';
import { SignupComponent } from './components/login-signup/signup/signup.component';
import { authGuard } from './guards/auth/auth.guard';
import { ResetPasswordComponent } from './components/login-signup/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Hue Festival - Login Page' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Hue Festival - Signup Page' }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: { title: 'Hue Festival - Reset Password' }
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**',
    data: { title: 'Hue Festival - 404 Not Found' },
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
