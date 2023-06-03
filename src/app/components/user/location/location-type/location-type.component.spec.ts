import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTypeComponent } from './location-type.component';

describe('LocationTypeComponent', () => {
  let component: LocationTypeComponent;
  let fixture: ComponentFixture<LocationTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationTypeComponent]
    });
    fixture = TestBed.createComponent(LocationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
