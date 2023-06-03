import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { authGuard } from 'src/app/guards/auth/auth.guard';
import { DashboardChildComponent } from './dashboard-child/dashboard-child.component';
import { SupportMenuComponent } from './support-menu/support-menu.component';
import { ListNewsComponent } from './news/list-news/list-news.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { LocationTypeComponent } from './location/location-type/location-type.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
