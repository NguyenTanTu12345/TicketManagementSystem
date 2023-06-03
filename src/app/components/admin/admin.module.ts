import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ListSupportMenuComponent } from './support-menu/list-support-menu/list-support-menu.component';
import { FormSupportMenuComponent } from './support-menu/form-support-menu/form-support-menu.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { FormUserComponent } from './user/form-user/form-user.component';
import { ListLocationTypeComponent } from './location-type/list-location-type/list-location-type.component';
import { FormLocationTypeComponent } from './location-type/form-location-type/form-location-type.component';
import { ListLocationComponent } from './location/list-location/list-location.component';
import { FormLocationComponent } from './location/form-location/form-location.component';
import { ListNewsComponent } from './news/list-news/list-news.component';
import { FormNewsComponent } from './news/form-news/form-news.component';
import { ListProgramComponent } from './program/list-program/list-program.component';
import { FormProgramComponent } from './program/form-program/form-program.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormScheduleComponent } from './user/form-schedule/form-schedule.component';
import {MatCardModule} from '@angular/material/card';
import { UpdateScheduleComponent } from './user/update-schedule/update-schedule.component';
import { ListArtistComponent } from './artist/list-artist/list-artist.component';
import { FormArtistComponent } from './artist/form-artist/form-artist.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ListSupportMenuComponent,
    FormSupportMenuComponent,
    ListUserComponent,
    FormUserComponent,
    ListLocationTypeComponent,
    FormLocationTypeComponent,
    ListLocationComponent,
    FormLocationComponent,
    ListNewsComponent,
    FormNewsComponent,
    ListProgramComponent,
    FormProgramComponent,
    FormScheduleComponent,
    UpdateScheduleComponent,
    ListArtistComponent,
    FormArtistComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTreeModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule
  ]
})
export class AdminModule { }
