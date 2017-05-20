import { Component, OnInit } from '@angular/core';
import { Entry } from './classes/Entry';
import { EntryService } from './entry.service';
import { WeatherService } from './weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import jump from 'jump.js'

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

declare var chrome : any; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles/app.component.scss'],
  providers: [EntryService, WeatherService],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.8s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})



export class AppComponent {

  public entries : Entry[] = []
  private bgImageSrc : string;
  private imageLoaded: boolean = false;
  public userLocation:any;
  

  constructor(private entryService: EntryService, private weatherService:WeatherService)
  {
    
  }

  ngOnInit()
  {

    this.entries = this.entryService.getEntries();


    // chrome.identity.getAuthToken( (token) => {
    //       if (chrome.runtime.lastError) {
    //           alert(chrome.runtime.lastError.message);
    //           return;
    //       }
    //       var x = new XMLHttpRequest();
    //       x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
    //       x.onload = function() {
    //           console.log(x.response);
    //       };
    //       x.send();
    //   });

    this.userLocation = this.weatherService.getCachedLocation();
    console.log(this.userLocation)

    navigator.geolocation.getCurrentPosition((pos)=>{
      this.weatherService.getWeather(pos.coords).subscribe((res)=>{
        this.userLocation = res
      });
    }, ()=>{}, ()=>{});
  }

  

  addNewEntry(newEntry: Entry)
  {
    jump(-document.body.scrollTop,{
      duration:200,
      callback: () => this.entryService.addEntry(newEntry)
    });
    
    
  }

  
}
