import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';
import nlp from 'compromise';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['../../../styles/entry.component.scss']
})

export class EntryComponent implements OnInit {
  @Input() entry;
  @Output() onDeleteSubEntry: EventEmitter<any> = new EventEmitter();

  public subEntryList:string[];
  
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() 
  {
    if (this.entry) {
      this.subEntryList = this.entry.body;
    } 
  }

  deleteSubEntry(subEntryBody: string)
  {
    const subEntryIndex = this.entry.body.findIndex(e => e === subEntryBody);
    this.onDeleteSubEntry.emit({entryId:this.entry.id, subEntryIndex: subEntryIndex});
  }

  getDateColor()
  {
    const colors = ['#87cefa', '#9387fa','#fa8787', '#78ca78', '#facc87'];
    return colors[new Date(this.entry.date).getDate() % colors.length];
  }
}
