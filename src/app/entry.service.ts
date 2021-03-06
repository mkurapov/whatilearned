import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Entry, SubEntry } from './classes/Entry';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EntryService {

  private entries : Entry[] = [];

  constructor() {}
  
  getEntries() 
  {
    if (localStorage.entries) {
      this.entries = <Entry[]> JSON.parse(localStorage.entries);
    }

    //need to make this check more reasonable, should remove down the road once new entries are in the same format
    if (this.entries.length > 0) {

      for (let i = 0; i < this.entries.length; i++) {
        let body = this.entries[i].body;  

        for (let j = 0; j < body.length; j++) {
          let subEntry = body[j]; 

          if (typeof subEntry == 'string') {

            let newSubEntry:SubEntry = {
              id: Math.random(),
              text:subEntry,
              isHighlighted:false
            }
            this.entries[i].body[j] = newSubEntry;
          }
        }
    }
  }
    return this.entries;
  }

  extractData(res: Response)
  {
    return res.json();
  }

  addEntry(newBodyElement:string)
  {
    let newEntry:Entry = {
      id: Math.random(),
      body: [],
      date: new Date()
    }

    let newSubEntry:SubEntry = {
      id: Math.random(),
      text:newBodyElement,
      isHighlighted:false
    }

    let previousEntry = this.entries[0] || null;
    let previousDate = previousEntry ? new Date(this.entries[0].date).toDateString() : null;
    let newDate = newEntry.date.toDateString();
    
    if (previousDate === newDate) {
        previousEntry.body.unshift(newSubEntry)
    }
    else {
        newEntry.body.unshift(newSubEntry);
        this.entries.unshift(newEntry);
    }

    this.updateLocalStorage()
  }

  deleteSubEntry(entryWrap)
  {
    let entryToChange = entryWrap.parentEntry;
    let subEntryToChange = entryWrap.subEntry;
    
      for (const entry of this.entries) {
      if (entry.id === entryToChange.id) {
        const subToRemoveIndex = entry.body.findIndex(sub => sub.id == subEntryToChange.id);
        entry.body.splice(subToRemoveIndex, 1);
        
        if (entry.body.length === 0) {
          const entryToRemoveIndex = this.entries.findIndex(e => e.id == entry.id);
          this.entries.splice(entryToRemoveIndex, 1);
        }

        break;
      }
    }
    
    this.updateLocalStorage()
  }

  updateLocalStorage()
  {
    localStorage.entries = JSON.stringify(this.entries);
  }
}
