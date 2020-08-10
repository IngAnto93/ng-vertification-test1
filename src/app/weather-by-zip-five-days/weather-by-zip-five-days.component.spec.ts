import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherByZipFiveDaysComponent } from './weather-by-zip-five-days.component';

describe('WeatherByZipFiveDaysComponent', () => {
  let component: WeatherByZipFiveDaysComponent;
  let fixture: ComponentFixture<WeatherByZipFiveDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherByZipFiveDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherByZipFiveDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
