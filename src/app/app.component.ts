import { Component, OnInit } from '@angular/core';
import { Entry } from './classes/Entry';
import { EntryService } from './entry.service';
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
  providers: [EntryService],
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

  constructor(private entryService: EntryService)
  {
    
  }

  ngOnInit()
  {
    this.entries = this.entryService.getEntries();
  }

  

  addNewEntry(newEntry: Entry)
  {
  
    this.entryService.addEntry(newEntry);
  }
}
