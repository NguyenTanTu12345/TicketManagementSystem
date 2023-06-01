import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSupportMenuComponent } from './form-support-menu.component';

describe('FormSupportMenuComponent', () => {
  let component: FormSupportMenuComponent;
  let fixture: ComponentFixture<FormSupportMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSupportMenuComponent]
    });
    fixture = TestBed.createComponent(FormSupportMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should form', () => {
    expect(component).toBeTruthy();
  });
});
