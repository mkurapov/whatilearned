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

    let encodedBodyString = anchorMe(newBodyElement, {attributes:[ /*{name:"target",value:"_blank"}*/]});  //will remove blank
    let previousEntry = this.entries[0] || null;
    let previousDate = previousEntry ? new Date(this.entries[0].date).toDateString() : null;
    let newDate = newEntry.date.toDateString();
    
    if (previousDate === newDate) {
        previousEntry.body.unshift(encodedBodyString)
    }
    else {
        newEntry.body.unshift(encodedBodyString);
        this.entries.unshift(newEntry);
    }

    this.updateLocalStorage()
  }

  updateLocalStorage()
  {
    localStorage.entries = JSON.stringify(this.entries);
  }
}
