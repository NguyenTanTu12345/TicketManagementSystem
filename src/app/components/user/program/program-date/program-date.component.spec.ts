import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDateComponent } from './program-date.component';

describe('ProgramDateComponent', () => {
  let component: ProgramDateComponent;
  let fixture: ComponentFixture<ProgramDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramDateComponent]
    });
    fixture = TestBed.createComponent(ProgramDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
