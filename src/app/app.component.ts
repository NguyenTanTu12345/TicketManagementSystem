import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { slideInAnimation } from './animations';
import { ChildrenOutletContexts } from '@angular/router';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Quản lý người dùng',
    children: [{ name: 'Nhân viên' }, { name: 'Khách hàng' }, { name: 'Nghệ sĩ' }]
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
    children: [{ name: 'Menu hỗ trợ' }]
  }
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'TicketManagementSystem';

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
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

  constructor(private contexts: ChildrenOutletContexts) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
