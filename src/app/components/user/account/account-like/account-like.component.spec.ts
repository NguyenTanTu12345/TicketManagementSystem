import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLikeComponent } from './account-like.component';

describe('AccountLikeComponent', () => {
  let component: AccountLikeComponent;
  let fixture: ComponentFixture<AccountLikeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountLikeComponent]
    });
    fixture = TestBed.createComponent(AccountLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
