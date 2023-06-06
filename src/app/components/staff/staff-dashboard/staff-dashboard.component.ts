import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { UserSchedule } from 'src/app/models/user-schedule.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location/location.service';
import { ProgramService } from 'src/app/services/program/program.service';
import { SupportMenuService } from 'src/app/services/support-menu/support-menu.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private media: MediaMatcher,
    private contexts: ChildrenOutletContexts,
    private router: Router
  ) { 
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  getAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  backHome() {
    this.router.navigate(['staff/dashboard']);
  }

  logOut() {
    this.authService.signOut();
  }
}
