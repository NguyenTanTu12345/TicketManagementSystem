import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { slideInAnimation } from 'src/app/helpers/animations';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SupportMenuService } from 'src/app/services/support-menu/support-menu.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  animations: [ slideInAnimation ]
})
export class UserDashboardComponent implements OnInit {

  supportMenu: SupportMenu[] = [];

  constructor(
    private supportMenuService: SupportMenuService,
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
    this.supportMenuService.getAll().subscribe({
      next: (res) => {
        this.supportMenu = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
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
    this.router.navigate(['user/dashboard']);
  }

  logOut() {
    this.authService.signOut();
  }
}
