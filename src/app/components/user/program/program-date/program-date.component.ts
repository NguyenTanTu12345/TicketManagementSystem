import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/services/program/program.service';

@Component({
  selector: 'app-program-date',
  templateUrl: './program-date.component.html',
  styleUrls: ['./program-date.component.css']
})
export class ProgramDateComponent {

  programs1: Program[] = [];
  programs2: Program[] = [];

  constructor(
    private programService: ProgramService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let idStr = params.get('id');
        if (idStr) {
          let id = parseInt(idStr, 10); // base 10
          this.getAll(id);
        }
      }
    });
  }

  getAll(id: number) {
    this.programService.getByDate(id).subscribe({
      next: (res) => {
        res.forEach(element => {
          if (element.typeInOff == true) {
            this.programs1.push(element);
          }
          else {
            this.programs2.push(element);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
