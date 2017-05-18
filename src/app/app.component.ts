import { Component, OnInit } from '@angular/core';
import { Entry } from './classes/Entry';
import { EntryService } from './entry.service';
import { UnsplashService } from './unsplash.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  providers: [EntryService, UnsplashService],
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

  constructor(private entryService: EntryService, private unsplashService:UnsplashService)
  {
    
  }

  ngOnInit()
  {
    this.unsplashService.getRandomImage().subscribe((src)=>{
      this.bgImageSrc = src;
      this.imageLoaded = true;
    });

    this.entries = this.entryService.getEntries();
  }

  

  addNewEntry(newEntry: Entry)
  {
    this.entryService.addEntry(newEntry);
  }

  
}
