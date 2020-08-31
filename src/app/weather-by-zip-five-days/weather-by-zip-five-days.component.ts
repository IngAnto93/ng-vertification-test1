import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OpenWeatherMapApiService } from 'app/services/open-weather-map-api.service';
import { Forecast5DaysOpenWeatherApiResponse } from 'app/models/forecast-5days-open-weather-api-response';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Component({
  selector: 'app-weather-by-zip-five-days',
  templateUrl: './weather-by-zip-five-days.component.html',
  styleUrls: ['./weather-by-zip-five-days.component.css']
})
export class WeatherByZipFiveDaysComponent implements OnInit {

  zipCode: string;
  forecast5Days: Forecast5DaysOpenWeatherApiResponse;

  constructor(private route: ActivatedRoute, 
              private openWeatherMapApiService: OpenWeatherMapApiService) { }

  ngOnInit() {
    this.zipCode = this.route.snapshot.params.zipCode;
    this.openWeatherMapApiService.getForecast5DaysWeather(this.zipCode).subscribe(
      (response) => {
        this.forecast5Days = response;
        if (this.forecast5Days){
          this.forecast5Days.list = this.forecast5Days.list.slice(0, 5);
          this.forecast5Days.city.zipCode = this.zipCode;
        }
      }
    );
  }

  getDateFromTimestamp(dateTimestamp): string {
    const date = new Date(dateTimestamp * 1000);
    return DAYS[date.getDay()] + ', ' + MONTHS[date.getMonth()] + ' ' + date.getDate();
  }

  getWeatherIcon(weatherIconCase: string): string {
    return this.openWeatherMapApiService.getWeatherIcon(weatherIconCase);
  }

  getCelsiusDegrees(degree: number) {
    return this.openWeatherMapApiService.convertFromKelvinToCelsius(degree);
  }

}
