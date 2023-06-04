import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardChildComponent } from './dashboard-child/dashboard-child.component';
import { SupportMenuComponent } from './support-menu/support-menu.component';
import { ListNewsComponent } from './news/list-news/list-news.component';
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { LocationTypeComponent } from './location/location-type/location-type.component';
import { ListLocationComponent } from './location/list-location/list-location.component';
import { LocationDetailComponent } from './location/location-detail/location-detail.component';
import { ListProgramComponent } from './program/list-program/list-program.component';
import { ProgramDetailComponent } from './program/program-detail/program-detail.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    UserDashboardComponent,
    DashboardChildComponent,
    SupportMenuComponent,
    ListNewsComponent,
    NewsDetailComponent,
    LocationTypeComponent,
    ListLocationComponent,
    LocationDetailComponent,
    ListProgramComponent,
    ProgramDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ]
})
export class UserModule { }
