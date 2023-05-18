import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportMenuComponent } from './list-support-menu.component';

describe('HelpMenuComponent', () => {
  let component: SupportMenuComponent;
  let fixture: ComponentFixture<SupportMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportMenuComponent]
    });
    fixture = TestBed.createComponent(SupportMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
