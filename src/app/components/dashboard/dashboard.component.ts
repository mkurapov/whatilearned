import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../styles/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  public currentTime = <Observable<any>> Observable.of('Loading...');

  constructor() { }

  ngOnInit() {
    this.currentTime = Observable.interval(1000).map(x => new Date()).share();
  }

}
