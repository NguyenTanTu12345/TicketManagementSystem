import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupportMenuComponent } from './components/support-menu/list-support-menu/list-support-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormSupportMenuComponent } from './components/support-menu/form-support-menu/form-support-menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SupportMenuComponent,
    FormSupportMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
