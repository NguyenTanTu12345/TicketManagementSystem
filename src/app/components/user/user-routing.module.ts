import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { authGuard } from 'src/app/guards/auth/auth.guard';
import { DashboardChildComponent } from './dashboard-child/dashboard-child.component';
import { SupportMenuComponent } from './support-menu/support-menu.component';
import { ListNewsComponent } from './news/list-news/list-news.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { LocationTypeComponent } from './location/location-type/location-type.component';
import { ListLocationComponent } from './location/list-location/list-location.component';
import { LocationDetailComponent } from './location/location-detail/location-detail.component';
import { ListProgram } from 'src/app/models/list-program.model';
import { ListProgramComponent } from './program/list-program/list-program.component';
import { ProgramDetailComponent } from './program/program-detail/program-detail.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    data: { title: "Hue Festival | Home Page" },
    children: [
      {
        path: '',
        component: DashboardChildComponent,
        data: { animation: '' }
      },
      {
        path: 'support-menu/:id',
        component: SupportMenuComponent,
        data: { animation: 'support-menu' }
      },
      {
        path: 'list-news',
        component: ListNewsComponent,
        data: { animation: 'list-news' }
      },
      {
        path: 'list-news/detail/:id',
        component: NewsDetailComponent,
        data: { animation: 'list-news-detail' }
      },
      {
        path: 'location-type',
        component: LocationTypeComponent,
        data: { animation: 'location-type' }
      },
      {
        path: 'list-location/:id',
        component: ListLocationComponent,
        data: { animation: 'list-location' }
      },
      {
        path: 'location-detail/:id',
        component: LocationDetailComponent,
        data: { animation: 'location-detail' }
      },
      {
        path: 'list-program',
        component: ListProgramComponent,
        data: { animation: 'list-program' }
      },
      {
        path: 'program-detail/:id',
        component: ProgramDetailComponent,
        data: { animation: 'program-detail' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
