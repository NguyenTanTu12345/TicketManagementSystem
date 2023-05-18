import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportMenuComponent } from './components/support-menu/list-support-menu/list-support-menu.component';
import { FormSupportMenuComponent } from './components/support-menu/form-support-menu/form-support-menu.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
