import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from 'src/app/helpers/animations';

interface TableNode {
  name: string;
  children?: TableNode[];
}

const TREE_DATA: TableNode[] = [
  {
    name: 'Quản lý người dùng',
    children: [{ name: 'Người dùng' }]
  },
  {
    name: 'Quản lý sự kiện',
    children: [{ name: 'Chương trình' }, { name: 'Tin tức' }]
  },
  {
    name: 'Quản lý địa điểm',
    children: [{ name: 'Loại địa điểm' }, { name: 'Địa điểm' }]
  },
  {
    name: 'Khác',
    children: [{ name: 'Nghệ sĩ' },{ name: 'Menu hỗ trợ' }, { name: 'Đăng xuất' }]
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [ slideInAnimation ]
})
export class AdminDashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
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
    this.dataSource.data = TREE_DATA;
  }

  private _transformer = (node: TableNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logOut() {
    this.authService.signOut();
  }
}
