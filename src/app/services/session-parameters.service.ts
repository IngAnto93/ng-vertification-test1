import { Injectable } from '@angular/core';
import { CurrentOpenWeatherApiResponse } from 'app/models/current-open-weather-api-response';

@Injectable({
  providedIn: 'root'
})
export class SessionParametersService {

  items: CurrentOpenWeatherApiResponse[] = null;

  constructor() { }

  initializeItems(){
    this.items = [];
  }

  addItem(item: CurrentOpenWeatherApiResponse){
    this.items.push(item);
  }

  getItems() : CurrentOpenWeatherApiResponse[]{
    return this.items;
  }

  deleteItem(zipCode: string){
    this.items = this.items.filter( x => x.zipCode !== zipCode);
  }

}
