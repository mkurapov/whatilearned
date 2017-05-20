import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class WeatherService {

  private baseUrl:string = 'https://query.yahooapis.com/v1/public/yql?q=';
  private cachedUserLocation : any;

  constructor(private http:Http) {}

  getCachedLocation() {
    console.log(localStorage.userLocation)
    this.cachedUserLocation = JSON.parse(localStorage.userLocation);
    
    return this.cachedUserLocation;
  }

  getWeather(coords){
   return  this.http.get(this.createLink(coords)).map((res)=> {
      const locationObj = res.json().query.results.channel;
      localStorage.userLocation = JSON.stringify(locationObj);
      this.cachedUserLocation = locationObj;
      return locationObj;
    });
  }

  createLink(coords):string {
    return this.baseUrl + `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${coords.latitude}, ${coords.longitude})")&format=json`;
  }

}
