import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketScannerComponent } from './ticket-scanner.component';

describe('TicketScannerComponent', () => {
  let component: TicketScannerComponent;
  let fixture: ComponentFixture<TicketScannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketScannerComponent]
    });
    fixture = TestBed.createComponent(TicketScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
