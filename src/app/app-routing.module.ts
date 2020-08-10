import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { WeatherByZipFiveDaysComponent } from './weather-by-zip-five-days/weather-by-zip-five-days.component';
import { ZipCodeComponent } from './zip-code/zip-code.component';

const routes: Routes = [
  { path: '', component: ZipCodeComponent },
  { path: 'forecast/:zipCode', component: WeatherByZipFiveDaysComponent },
  { path: '',   redirectTo: '', pathMatch: 'full' }, // redirect to `first-component`
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: ''}]
})
export class AppRoutingModule { }
