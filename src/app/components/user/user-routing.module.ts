import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { authGuard } from 'src/app/guards/auth/auth.guard';
import { DashboardChildComponent } from './dashboard-child/dashboard-child.component';
import { SupportMenuComponent } from './support-menu/support-menu.component';
import { ListNewsComponent } from './news/list-news/list-news.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    data: { title: "Hue Festival | Home Page" },
    children: [
      {
        path: '',
        component: DashboardChildComponent
      },
      {
        path: 'support-menu/:id',
        component: SupportMenuComponent
      },
      {
        path: 'list-news',
        component: ListNewsComponent
      },
      {
        path: 'list-news/detail/:id',
        component: NewsDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
