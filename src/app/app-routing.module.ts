import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpMenuComponent } from './components/help-menu/help-menu/help-menu.component';

const routes: Routes = [
  {
    path: 'help-menu',
    component: HelpMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
