import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { OpenWeatherMapApiService } from '../services/open-weather-map-api.service';
import { SessionParametersService } from '../services/session-parameters.service';
import { CurrentOpenWeatherApiResponse } from 'app/models/current-open-weather-api-response';
import { Observable } from 'rxjs';
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
            response.main.temp = response.main.temp - 273,15;
            response.main.temp_min = response.main.temp_min - 273,15;
            response.main.temp_max = response.main.temp_max - 273,15;
            switch (response.weather[0].main){
              case Constants.SUN : {
                response.imgSource = Constants.IMG_SOURCE_SUN;
                break;
              }
              case Constants.SNOW : {
                response.imgSource = Constants.IMG_SOURCE_SNOW;
                break;
              }
              case Constants.RAIN : {
                response.imgSource = Constants.IMG_SOURCE_RAIN;
                break;
              }
              case Constants.CLOUDS : {
                response.imgSource = Constants.IMG_SOURCE_CLOUDS;
                break;
              }
            } 
            if (addToLocalStorage){
              var oldItems = this.getZipCodesFromLocalStorage();
              var newItem = zipCode;
              oldItems.push(newItem);
              localStorage.setItem(Constants.LOCAL_STORAGE_ARRAY, JSON.stringify(oldItems));
            }
          }
          else{
            if (addToLocalStorage){
              alert(Constants.MSG_ERROR_GET_CURRENT_WEATHER + ": " + zipCode);
            }
            return undefined;
          }
        }
      ));
    }
    else {
      alert(Constants.MSG_ZIP_ALREADY_EXIST);
      return undefined;
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
