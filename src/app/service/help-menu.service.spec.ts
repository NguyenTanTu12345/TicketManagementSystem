import { TestBed } from '@angular/core/testing';

import { HelpMenuService } from './help-menu.service';

describe('HelpMenuService', () => {
  let service: HelpMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
