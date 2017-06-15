import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { isEmptyObj } from '../../helpers/helpers';

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
    setInterval(_=>{
      this.currentTime = new Date();
    },1000)
  }

  ngOnChanges() {
    if (!isEmptyObj(this.userLocation)) { 
      this.userArea = this.userLocation.location.city + ', ' + this.userLocation.location.region;
      this.userTemperature = this.userLocation.item.condition.temp;
      this.userWeather = this.userLocation.item.condition.text; //can map this to icon later
    }
  }
}
