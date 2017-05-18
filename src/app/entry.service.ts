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
    if (localStorage.entries)
    {
      this.entries = <Entry[]> JSON.parse(localStorage.entries);
    }
  
    return this.entries;
  }


  extractData(res: Response)
  {
    return res.json();
  }

  addEntry(newEntry:Entry)
  {
   
    this.entries.unshift(newEntry);
    console.log(JSON.stringify(this.entries))
    this.updateLocalStorage()
  }

  updateLocalStorage()
  {
    console.log(this.entries)
    localStorage.entries = JSON.stringify(this.entries);
  }
}
