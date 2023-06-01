import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupportMenuComponent } from './list-support-menu.component';

describe('HelpMenuComponent', () => {
  let component: ListSupportMenuComponent;
  let fixture: ComponentFixture<ListSupportMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSupportMenuComponent]
    });
    fixture = TestBed.createComponent(ListSupportMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
