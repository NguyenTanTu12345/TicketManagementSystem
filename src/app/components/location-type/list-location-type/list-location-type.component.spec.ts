import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocationTypeComponent } from './list-location-type.component';

describe('ListLocationTypeComponent', () => {
  let component: ListLocationTypeComponent;
  let fixture: ComponentFixture<ListLocationTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLocationTypeComponent]
    });
    fixture = TestBed.createComponent(ListLocationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
