import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Entry } from './classes/Entry';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EntryService {

  private entries : Entry[] = [];

  constructor() 
  {
    
  }
  
  getEntries() 
  {
    if (localStorage.entries) {
      this.entries = <Entry[]> JSON.parse(localStorage.entries);
    }

  
    return this.entries;
  }


  extractData(res: Response)
  {
    return res.json();
  }

  addEntry(newBodyElement:string)
  {
    let newEntry = {
      id: Math.random(),
      body: [],
      date: new Date()
    }

    let previousEntry = this.entries[0] || null;
    let previousDate = previousEntry ? new Date(this.entries[0].date).toDateString() : null;
    let newDate = newEntry.date.toDateString();
    
    if (previousDate === newDate) {
        previousEntry.body.unshift(newBodyElement)
    }
    else {
        newEntry.body.unshift(newBodyElement);
        this.entries.unshift(newEntry);
    }

    this.updateLocalStorage()
  }

  updateLocalStorage()
  {
    localStorage.entries = JSON.stringify(this.entries);
  }
}
