import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TicketScannerComponent } from './ticket/ticket-scanner/ticket-scanner.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './ticket/history/history.component';

@NgModule({
  declarations: [
    StaffDashboardComponent,
    DashboardContentComponent,
    TicketScannerComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NgxScannerQrcodeModule,
    FormsModule
  ]
})
export class StaffModule { }
