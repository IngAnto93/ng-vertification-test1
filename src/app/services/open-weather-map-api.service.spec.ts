import { TestBed } from '@angular/core/testing';

import { OpenWeatherMapApiService } from './open-weather-map-api.service';

describe('OpenWeatherMapApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenWeatherMapApiService = TestBed.get(OpenWeatherMapApiService);
    expect(service).toBeTruthy();
  });
});
