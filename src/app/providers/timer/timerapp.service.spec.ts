import { TestBed } from '@angular/core/testing';

import { TimerappService } from './timerapp.service';

describe('TimerappService', () => {
  let service: TimerappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
