import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocationTypeComponent } from './form-location-type.component';

describe('FormLocationTypeComponent', () => {
  let component: FormLocationTypeComponent;
  let fixture: ComponentFixture<FormLocationTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormLocationTypeComponent]
    });
    fixture = TestBed.createComponent(FormLocationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
