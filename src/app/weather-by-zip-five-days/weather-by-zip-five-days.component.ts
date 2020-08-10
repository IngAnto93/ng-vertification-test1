import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-weather-by-zip-five-days',
  templateUrl: './weather-by-zip-five-days.component.html',
  styleUrls: ['./weather-by-zip-five-days.component.css']
})
export class WeatherByZipFiveDaysComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  private name: string;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
  }

}
