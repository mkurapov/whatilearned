import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';
import nlp from 'compromise';

@Component({
  selector: 'app-single-entry',
  templateUrl: './single-entry.component.html',
  styleUrls: ['../../../styles/single-entry.component.scss']
})

export class SingleEntryComponent implements OnInit {
  @Input() entry;
  @Output() onDeleteEntry: EventEmitter<any> = new EventEmitter();

  public subEntryList:string[];
  
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() 
  {
    if (this.entry) {
      this.subEntryList = this.entry.body;
    } 
  }

  

  deleteEntry()
  {
    this.onDeleteEntry.emit(this.entry.id);
  }

  getDateColor()
  {
    const colors = ['#87cefa', '#facc87','#9387fa','#fa8787','#87dafa'];
    return colors[new Date(this.entry.date).getDate() % colors.length];
  }
}
