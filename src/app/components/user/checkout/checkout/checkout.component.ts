import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Program } from 'src/app/models/program.model';
import { UserProgram } from 'src/app/models/user-program.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location/location.service';
import { ProgramService } from 'src/app/services/program/program.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  userObj: User = {
    userId: '',
    userPassword: '',
    mail: '',
    phoneNumber: '',
    userState: true,
    cccd: '',
    fullName: '',
    dateOfBirth: new Date(Date.now()),
    roleId: '',
    accessToken: ''
  };

  program: Program = {
    programId: '',
    programName: '',
    programContent: '',
    programTime: '',
    programTdate: null,
    programFdate: null,
    typeInOff: true,
    programPrice: 0,
    totalTicket: 0,
    programType: true,
    locationId: '',
    imagePaths: '',
    accessToken: ''
  };
  userProgram: UserProgram = {
    userProgramId: 0,
    userId: '',
    fullName: '',
    programId: '',
    programName: '',
    isLike: false,
    alarmTime: '',
    alarmDate: new Date(Date.now()),
    qrcodePath: '',
    quantity: 0,
    accessToken: ''
  };
  arrImage: string[] = [];
  locationName: string = '';
  total: number = 1;

  constructor(private authService: AuthService,
    private activedRoute: ActivatedRoute,
    private locationService: LocationService,
    private programService: ProgramService
  ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.programService.get(id).subscribe({
            next: (res) => {
              this.program = res;
              let myString = res.imagePaths;
              this.arrImage = myString.split("@");
              this.getLocation(res.locationId);
            },
            error: (err) => {
              console.log(err);
            }
          });

          this.authService.getByMail(this.authService.getMail()).subscribe({
            next: (res) => {
              this.userObj = res;
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    });
  }

  getLocation(id: string) {
    this.locationService.get(id).subscribe({
      next: (res) => {
        this.locationName = res.locationName;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  payment() {
    this.userProgram.userId = this.userObj.userId;
    this.userProgram.programId = this.program.programId;
    this.userProgram.quantity = this.total;
    this.userProgram.accessToken = this.authService.getJWT() ?? '';
    console.log(this.userProgram)
    this.authService.payment(this.userProgram).subscribe({
      next: (res) => {
        console.log(res);
        window.open(res.message, "_self");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
