import { TestBed } from '@angular/core/testing';

import { UserScheduleService } from './user-schedule.service';

describe('UserScheduleService', () => {
  let service: UserScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
