import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CurrentOpenWeatherApiResponse } from '../models/current-open-weather-api-response';
import { Forecast5DaysOpenWeatherApiResponse } from '../models/forecast-5days-open-weather-api-response';
import { Constants } from '../constants';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', zipCode: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      switch (operation){
        case Constants.OPERATION_GET_CURRENT_WEATHER : {
          alert(Constants.MSG_ERROR_GET_CURRENT_WEATHER + ": " + zipCode);
          break;
        }
        case Constants.OPERATION_GET_FORECAST_5DAYS : {
          alert(Constants.MSG_ERROR_GET_FORECAST_5DAYS + ": " + zipCode);
          break;
        }
      }
      return of(result as T);
    };
  }

  getCurrentWeather(zipCode : string) : Observable<CurrentOpenWeatherApiResponse>{
    return this.http.get<CurrentOpenWeatherApiResponse>(
      Constants.CURRENT_WEATHER_URL + zipCode + Constants.APP_ID_PARAM + Constants.APP_ID).pipe(
        catchError(this.handleError<CurrentOpenWeatherApiResponse>('getCurrentWeather', zipCode, undefined))
      );
  }

  getForecast5DaysWeather(zipCode: string): Observable<Forecast5DaysOpenWeatherApiResponse> {
    return this.http.get<Forecast5DaysOpenWeatherApiResponse>(
      Constants.FORECAST_5DAYS_WEATHER_URL + zipCode + Constants.APP_ID_PARAM + Constants.APP_ID).pipe(
        catchError(this.handleError<Forecast5DaysOpenWeatherApiResponse>('getForecast5DaysWeather', zipCode, undefined))
      );
  }

  getWeatherIcon(weather: string): string{
    let imgSource = "";
    switch (weather){
      case Constants.SUN : {
        imgSource = Constants.IMG_SOURCE_SUN;
        break;
      }
      case Constants.SNOW : {
        imgSource = Constants.IMG_SOURCE_SNOW;
        break;
      }
      case Constants.RAIN : {
        imgSource = Constants.IMG_SOURCE_RAIN;
        break;
      }
      case Constants.CLOUDS : {
        imgSource = Constants.IMG_SOURCE_CLOUDS;
        break;
      }
    }
    return imgSource;
  }

  convertFromKelvinToCelsius(kelvinDegree: number){
    return Math.floor(kelvinDegree - 273.15);
  }
}

