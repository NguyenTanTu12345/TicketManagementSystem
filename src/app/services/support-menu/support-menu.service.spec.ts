import { TestBed } from '@angular/core/testing';

import { SupportMenuService } from './support-menu.service';

describe('SupportMenuService', () => {
  let service: SupportMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
