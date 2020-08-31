export class Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }
  
  export class Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  }
  
  export class Wind {
    speed: number;
    deg: number;
  }
  
  export class Clouds {
    all: number;
  }
  
  export class Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export class Coord {
    lon: number;
    lat: number;
  }
  
  export class CityWeatherDetails {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
    zipCode?: string;
  }
  
  export class City {
    coord: Coord;
    country: string;
    id: number;
    name: string;
    population: number;
    timezone: number;
    zipCode: string;
  }
  
  export class FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
  }
  
  export class ForecastTemp {
    day: number;
    night: number;
    eve: number;
    morn: number;
    max: number;
    min: number;
  }
  
  export class ForecastDetails {
    clouds: number;
    deg: number;
    dt: number;
    feels_like: FeelsLike;
    humidity: number;
    pop: number;
    pressure: number;
    speed: number;
    sunrise: number;
    sunset: number;
    temp: ForecastTemp;
    weather: Weather;
  }
  
  export class Forecast5DaysOpenWeatherApiResponse {
    city: City;
    cnt: number;
    code: string;
    message: number;
    list: Array<ForecastDetails>;
  }