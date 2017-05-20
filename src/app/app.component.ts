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
  private userLocation:any;

  constructor(private entryService: EntryService, private weatherService:WeatherService)
  {
    
  }

  ngOnInit()
  {

    this.entries = this.entryService.getEntries();

    navigator.geolocation.getCurrentPosition((pos)=>{
      this.weatherService.getWeather(pos.coords).subscribe((res)=>{
        this.userLocation = res
        console.log(res)
      });
    }, ()=>{}, ()=>{});
  }

  

  addNewEntry(newEntry: Entry)
  {
    jump(-1*document.body.scrollTop,{
      duration:200,
      callback: () => this.entryService.addEntry(newEntry)
    });
    
    
  }

  
}
