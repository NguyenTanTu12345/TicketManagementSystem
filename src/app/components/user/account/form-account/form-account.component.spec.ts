import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAccountComponent } from './form-account.component';

describe('FormAccountComponent', () => {
  let component: FormAccountComponent;
  let fixture: ComponentFixture<FormAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAccountComponent]
    });
    fixture = TestBed.createComponent(FormAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
