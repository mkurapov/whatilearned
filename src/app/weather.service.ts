import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class WeatherService {

  private baseUrl:string = 'https://query.yahooapis.com/v1/public/yql?q=';
  constructor(private http:Http) {}

  getWeather(coords){
    return this.http.get(this.createLink(coords)).map((res)=> {return res.json().query.results.channel});
    

  }

  createLink(coords):string {
    return this.baseUrl + `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${coords.latitude}, ${coords.longitude})")&format=json`;
  }

}
