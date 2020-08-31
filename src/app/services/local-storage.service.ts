import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { OpenWeatherMapApiService } from '../services/open-weather-map-api.service';
import { SessionParametersService } from '../services/session-parameters.service';
import { CurrentOpenWeatherApiResponse } from 'app/models/current-open-weather-api-response';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private openWeatherMapApiService: OpenWeatherMapApiService,
              private sessionParametersService: SessionParametersService) { }

  getZipCodesFromLocalStorage() : string[] {
    return JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_ARRAY)) || [];
  }

  addToLocalStorage(zipCode: string, addToLocalStorage: boolean) : Observable<CurrentOpenWeatherApiResponse> {
    if (!this.checkIfAlreadyExists(zipCode) || !addToLocalStorage){
      return this.openWeatherMapApiService.getCurrentWeather(zipCode).pipe(tap(
        response => {
          if (response && response.name && response.weather[0].main && response.main.temp
              && response.main.temp_min && response.main.temp_max){
            response.main.temp = this.openWeatherMapApiService.convertFromKelvinToCelsius(response.main.temp);
            response.main.temp_min = this.openWeatherMapApiService.convertFromKelvinToCelsius(response.main.temp_min);
            response.main.temp_max = this.openWeatherMapApiService.convertFromKelvinToCelsius(response.main.temp_max);
            response.imgSource = this.openWeatherMapApiService.getWeatherIcon(response.weather[0].main); 
            if (addToLocalStorage){
              var oldItems = this.getZipCodesFromLocalStorage();
              var newItem = zipCode;
              oldItems.push(newItem);
              localStorage.setItem(Constants.LOCAL_STORAGE_ARRAY, JSON.stringify(oldItems));
            }
          }
          else{
            //this if is for avoid double alert in case of error in http request. Indeed, this error is already catched
            //in getCurrentWeather
            if (response){
              alert(Constants.MSG_ERROR_GET_CURRENT_WEATHER + ": " + zipCode);
            }
            return of(undefined);
          }
        }
      ));
    }
    else {
      alert(Constants.MSG_ZIP_ALREADY_EXIST);
      return of(undefined);
    }
  }

  checkIfAlreadyExists(zipCode: string) : boolean {
    let check : boolean = false;
    if (zipCode && zipCode.length>=5){
      var zipCodes = this.getZipCodesFromLocalStorage();
      zipCodes.forEach(element => {
        if (element === zipCode){
          check = true;
        }
      });
    }
    return check;
  }

  deleteFromLocalStorage(zipCode: string) : boolean {
    let deleted : boolean = false;
    if (zipCode && zipCode.length>=5){
      var zipCodes = this.getZipCodesFromLocalStorage();
      if (zipCodes.find(x => x === zipCode)){
        var zipCodesNew = zipCodes.filter( x => x !== zipCode);
        localStorage.setItem(Constants.LOCAL_STORAGE_ARRAY, JSON.stringify(zipCodesNew));
        this.sessionParametersService.deleteItem(zipCode);
        deleted = true;
      }
    }
    return deleted;
  }

}
