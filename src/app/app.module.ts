import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupportMenuComponent } from './components/support-menu/list-support-menu/list-support-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormSupportMenuComponent } from './components/support-menu/form-support-menu/form-support-menu.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import { ListLocationTypeComponent } from './components/location-type/list-location-type/list-location-type.component';
import { FormLocationTypeComponent } from './components/location-type/form-location-type/form-location-type.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTreeModule} from '@angular/material/tree';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ListLocationComponent } from './components/location/list-location/list-location.component';
import { FormLocationComponent } from './components/location/form-location/form-location.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    SupportMenuComponent,
    FormSupportMenuComponent,
    ListLocationTypeComponent,
    FormLocationTypeComponent,
    ListLocationComponent,
    FormLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatTreeModule,
    MatSidenavModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
