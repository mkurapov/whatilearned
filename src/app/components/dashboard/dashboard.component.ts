import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../styles/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  @Input() userLocation : any;
  public currentTime : Date = new Date();
  
  constructor() { 
    
  }

  ngOnInit() {
    
    setInterval(_=>{
      this.currentTime = new Date();
    },1000)
  }

}
