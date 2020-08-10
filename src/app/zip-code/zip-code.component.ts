import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Constants } from 'app/constants';
import { CurrentOpenWeatherApiResponse } from 'app/models/current-open-weather-api-response';
import { SessionParametersService } from '../services/session-parameters.service';

@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  styleUrls: ['./zip-code.component.css']
})

export class ZipCodeComponent implements OnInit {
  zipCode: string;
  zipCodes: string[];
  currentWeatherArray: CurrentOpenWeatherApiResponse[];

  constructor(private localStorageService: LocalStorageService,
              private sessionParametersService: SessionParametersService) { }

  ngOnInit() {
    this.currentWeatherArray = this.sessionParametersService.getItems();
    if (this.currentWeatherArray){
      this.loadPage();
    }
    else{
      this.sessionParametersService.initializeItems();
      this.loadPageFirstTime();
    }
  }

  loadPage(){
    this.zipCode = "";
    this.zipCodes = this.localStorageService.getZipCodesFromLocalStorage();
    this.currentWeatherArray = this.sessionParametersService.getItems();
  }

  loadPageFirstTime(){
    this.currentWeatherArray = [];
    this.zipCode = "";
    this.zipCodes = this.localStorageService.getZipCodesFromLocalStorage();
    this.zipCodes.forEach(element => {
      this.addLocation(element, false);
    });
  }

  addLocation(zipCode: string, addToLocalStorage: boolean){
    this.localStorageService.addToLocalStorage(zipCode, addToLocalStorage).subscribe(
      response => {
        if (response){
          response.zipCode = zipCode;
          this.currentWeatherArray.push(response);
          this.sessionParametersService.addItem(response);
          if (addToLocalStorage){
            this.zipCodes.push(this.zipCode);
            alert(Constants.MSG_ZIP_ADDED);
          }
        }
      }
    );
  }

  removeLocation(zipCode: string){
    let response: boolean = this.localStorageService.deleteFromLocalStorage(zipCode);
    if (response){
      alert(Constants.MSG_ZIP_DELETED);
      this.loadPage();
    }
    else {
      alert(Constants.MSG_ZIP_NOT_DELETED);
    }
  }

}
