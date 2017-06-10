import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../styles/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  @Input() userLocation : any;

  public userArea: any;
  public userTemperature:any;
  public userWeather:any;
  public currentTime : Date = new Date();
  
  constructor() { 
    
  }

  ngOnInit() {
    
    if (this.userLocation !== {}) { 
      console.log(this.userLocation)
      this.userArea = this.userLocation.location.city + ', ' + this.userLocation.location.region;
      this.userTemperature = this.celsiusToFahrenheit(this.userLocation.item.condition.temp)  + '°';
      this.userWeather = this.userLocation.item.condition.text; //can map this to icon later
    }
    
    setInterval(_=>{
      this.currentTime = new Date();
    },1000)
  }

  //turn into pipe
  celsiusToFahrenheit(value: number)
  {
         return Math.round((value - 32) * 5/9);
  }
}
