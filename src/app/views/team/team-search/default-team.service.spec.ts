import { TestBed } from '@angular/core/testing';

import { DefaultTeamService } from './default-team.service';

describe('DefaultFlightService', () => {
  let service: DefaultTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
