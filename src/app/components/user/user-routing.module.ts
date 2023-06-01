import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { authGuard } from 'src/app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    data: {title: "Hue Festival | Home Page"},
    canActivate: [authGuard],
    children: [{
      path: '',
      children: [

      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
