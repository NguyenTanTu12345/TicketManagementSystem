import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportMenuComponent } from './components/support-menu/list-support-menu/list-support-menu.component';
import { FormSupportMenuComponent } from './components/support-menu/form-support-menu/form-support-menu.component';
import { ListLocationTypeComponent } from './components/location-type/list-location-type/list-location-type.component';
import { FormLocationTypeComponent } from './components/location-type/form-location-type/form-location-type.component';

const routes: Routes = [
  {
    path: 'support-menu',
    component: SupportMenuComponent
  },
  {
    path: 'support-menu/create/',
    component: FormSupportMenuComponent
  }
  ,
  {
    path: 'support-menu/update/:id',
    component: FormSupportMenuComponent
  },
  {
    path: 'location-type',
    component: ListLocationTypeComponent
  },
  {
    path: 'location-type/create/',
    component: FormLocationTypeComponent
  }
  ,
  {
    path: 'location-type/update/:id',
    component: FormLocationTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
