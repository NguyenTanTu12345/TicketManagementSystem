import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProgram } from 'src/app/models/user-program.model';
import { ProgramService } from 'src/app/services/program/program.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent {

  userPrograms: UserProgram[] = [];

  constructor(
    private programService: ProgramService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) { 
          this.programService.getAlarm(id).subscribe({
            next: (res) => {
              this.userPrograms = res;
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    });
  }
}
