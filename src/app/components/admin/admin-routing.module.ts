import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormSupportMenuComponent } from './support-menu/form-support-menu/form-support-menu.component';
import { ListSupportMenuComponent } from './support-menu/list-support-menu/list-support-menu.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { FormUserComponent } from './user/form-user/form-user.component';
import { ListLocationTypeComponent } from './location-type/list-location-type/list-location-type.component';
import { FormLocationTypeComponent } from './location-type/form-location-type/form-location-type.component';
import { ListLocationComponent } from './location/list-location/list-location.component';
import { FormLocationComponent } from './location/form-location/form-location.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    data: { title: "Hue Festival | Admin DashBoard" },
    children: [
      {
        path: 'support-menu',
        component: ListSupportMenuComponent,
        data: { animation: 'list-support-menu' }
      },
      {
        path: 'support-menu/create',
        component: FormSupportMenuComponent,
        data: { animation: 'form-support-menu' }
      },
      {
        path: 'support-menu/update/:id',
        component: FormSupportMenuComponent,
        data: { animation: 'form-support-menu1' }
      },
      {
        path: 'list-user',
        component: ListUserComponent,
        data: { animation: 'list-user' }
      },
      {
        path: 'list-user/create',
        component: FormUserComponent,
        data: { animation: 'form-user' }
      },
      {
        path: 'location-type',
        component: ListLocationTypeComponent,
        data: { animation: 'location-type' }
      },
      {
        path: 'location-type/create',
        component: FormLocationTypeComponent,
        data: { animation: 'form-location-type' }
      },
      {
        path: 'location-type/update/:id',
        component: FormLocationTypeComponent,
        data: { animation: 'form-location-type1' }
      },
      {
        path: 'list-location',
        component: ListLocationComponent,
        data: { animation: 'location' }
      },
      {
        path: 'list-location/create',
        component: FormLocationComponent,
        data: { animation: 'form-location' }
      },
      {
        path: 'list-location/update/:id',
        component: FormLocationComponent,
        data: { animation: 'form-location1' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
