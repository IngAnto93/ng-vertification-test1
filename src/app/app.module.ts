import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ZipCodeComponent } from './zip-code/zip-code.component';
import { WeatherByZipFiveDaysComponent } from './weather-by-zip-five-days/weather-by-zip-five-days.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, RouterModule, HttpClientModule ],
  declarations: [ AppComponent, ZipCodeComponent, WeatherByZipFiveDaysComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
