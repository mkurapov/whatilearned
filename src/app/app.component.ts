import { Component, OnInit } from '@angular/core';
import { Entry } from './classes/Entry';
import { EntryService } from './entry.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles/app.component.scss'],
  providers: [EntryService]
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
