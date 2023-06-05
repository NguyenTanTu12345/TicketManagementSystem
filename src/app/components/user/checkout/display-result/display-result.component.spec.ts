import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResultComponent } from './display-result.component';

describe('DisplayResultComponent', () => {
  let component: DisplayResultComponent;
  let fixture: ComponentFixture<DisplayResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayResultComponent]
    });
    fixture = TestBed.createComponent(DisplayResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
