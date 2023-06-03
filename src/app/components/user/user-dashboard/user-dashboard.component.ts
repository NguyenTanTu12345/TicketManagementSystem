import { MediaMatcher } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ChildrenOutletContexts } from '@angular/router';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SupportMenuService } from 'src/app/services/support-menu/support-menu.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  supportMenu: SupportMenu[] = [];

  constructor(
    private supportMenuService: SupportMenuService,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private media: MediaMatcher,
    private contexts: ChildrenOutletContexts
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

  logOut() {
    this.authService.signOut();
  }

  signOut() {
    this.authService.signOut();
  }
}
