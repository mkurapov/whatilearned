import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Entry } from './classes/Entry';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import anchorMe from 'anchorme';

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

    let encodedBodyString = anchorMe(newBodyElement);
    
    let previousEntry = this.entries[0];

  
    
    if (previousEntry) {
      if ((new Date(previousEntry.date).toDateString() === newEntry.date.toDateString())) {
        previousEntry.body.push(encodedBodyString)
        this.entries[0] = previousEntry;
      }
    }
    else {
      newEntry.body.push(encodedBodyString);
      this.entries.unshift(newEntry);
    }

    this.updateLocalStorage()
  }

  updateLocalStorage()
  {
    console.log(this.entries)
    localStorage.entries = JSON.stringify(this.entries);
  }
}
