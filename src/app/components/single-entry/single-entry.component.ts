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

  public bodyList: SafeHtml[] = [];
  
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() 
  {
    if (this.entry) {
      for (let li of this.entry.body) {
        this.bodyList.push(this.sanitizer.bypassSecurityTrustHtml(li));
      }
    } 
  }

  processEntry(i:number) 
  {
  
    const listEntry = this.entry.body[i];
    const isUrlEntry = listEntry.match(/<\/?[^>]+(>|$)/g) ? true : false;

    if (!isUrlEntry) {
      let query = listEntry;
      let context = nlp(listEntry).verbs().data();
      const nouns = nlp(listEntry).nouns().data().map(e => e.singular).join(' ').toString();
      console.log
      if (nouns) {
        query = nouns;
      }

      const url ='http://www.google.com/search?q=' + query;
      window.open(url);
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
