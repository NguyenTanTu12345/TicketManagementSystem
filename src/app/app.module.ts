import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserRoutingModule } from './components/user/user-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login-signup/login/login.component';
import { SignupComponent } from './components/login-signup/signup/signup.component';
import { SupportMenuComponent } from './components/support-menu/list-support-menu/list-support-menu.component';
import { ListLocationComponent } from './components/location/list-location/list-location.component';
import { FormLocationComponent } from './components/location/form-location/form-location.component';
import { ListLocationTypeComponent } from './components/location-type/list-location-type/list-location-type.component';
import { FormLocationTypeComponent } from './components/location-type/form-location-type/form-location-type.component';
import { FormSupportMenuComponent } from './components/support-menu/form-support-menu/form-support-menu.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SupportMenuComponent,
    FormSupportMenuComponent,
    ListLocationTypeComponent,
    FormLocationTypeComponent,
    ListLocationComponent,
    FormLocationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    UserRoutingModule,
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
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
