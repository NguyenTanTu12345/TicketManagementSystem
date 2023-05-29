import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { SupportMenuService } from 'src/app/services/support-menu/support-menu.service';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-support-menu',
  templateUrl: './form-support-menu.component.html',
  styleUrls: ['./form-support-menu.component.css']
})
export class FormSupportMenuComponent implements OnInit{

  supportMenu: SupportMenu = {
    supportMenuId: '',
    supportMenuContent: '',
    supportMenuTitle: '',
    userId: null
  }

  supportMenus: SupportMenu[] = [];

  constructor(private supportMenuService: SupportMenuService, private router: Router
              ,private activedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if(id) {
          this.supportMenuService.get(id).subscribe({
            next: value => {
              this.supportMenu = value;
            }
          });
        }
        else {
          this.supportMenuService.getAll().subscribe({
            next: data => {
              this.supportMenus = data;
            },
            error: response => {
              console.log(response);
            }
          });
        }
      }
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  generateID(): string {
    let newID = '';
    let index = this.supportMenus.length - 1;
    let item: SupportMenu = this.supportMenus[index];
    let lastChar = item.supportMenuId.substring(2,4);
    let ID = parseInt(lastChar) + 1;
    if (ID < 10) {
      newID = 'SU' + '0' + ID;
    }
    else if (ID > 10) {
      newID = 'SU' + ID;
    }
    return newID;
  }

  createOrUpdate() {
    var result;
    if (this.supportMenu.supportMenuId == '') {
      this.supportMenu.supportMenuId = this.generateID();
      result = this.supportMenuService.create(this.supportMenu);
    }
    else {
      result = this.supportMenuService.update(this.supportMenu);
    }
    result.subscribe({
      next: data => {
        this.router.navigate(['support-menu']);
      },
      error: response => {
        console.log(response);
      }
    });
  }

  delete(id: string) {
    this.supportMenuService.delete(id).subscribe({
      next: data => {
        this.router.navigate(['support-menu']);
      },
      error: response => {
        console.log(response);
      }
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}
