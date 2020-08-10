import { TestBed } from '@angular/core/testing';

import { SessionParametersService } from './session-parameters.service';

describe('SessionParametersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionParametersService = TestBed.get(SessionParametersService);
    expect(service).toBeTruthy();
  });
});
