import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { TicketScannerComponent } from './ticket/ticket-scanner/ticket-scanner.component';
import { HistoryComponent } from './ticket/history/history.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: StaffDashboardComponent,
    children: [
      {
        path: '', 
        component: DashboardContentComponent,
        data: {animation: 'dashboard'}
      },
      {
        path: 'ticket-scanner/:str', 
        component: TicketScannerComponent,
        data: {animation: 'ticket-scanner'}
      },
      {
        path: 'history', 
        component: HistoryComponent,
        data: {animation: 'history'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
