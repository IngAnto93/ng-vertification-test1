import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CurrentOpenWeatherApiResponse } from '../models/current-open-weather-api-response';
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
      alert(Constants.MSG_ERROR_GET_CURRENT_WEATHER + ": " + zipCode);
      return of(result as T);
    };
  }

  getCurrentWeather(zipCode : string) : Observable<CurrentOpenWeatherApiResponse>{
    return this.http.get<CurrentOpenWeatherApiResponse>(
      Constants.CURRENT_WEATHER_URL + zipCode + Constants.APP_ID_PARAM + Constants.APP_ID).pipe(
        catchError(this.handleError<CurrentOpenWeatherApiResponse>('getCurrentWeather', zipCode, undefined))
      );
  }

}
