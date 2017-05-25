import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';

import nlp from 'compromise';
import anchorme from 'anchorme';

@Component({
  selector: 'app-sub-entry',
  templateUrl: './sub-entry.component.html',
  styleUrls: ['../../../styles/sub-entry.component.scss']
})
export class SubEntryComponent implements OnInit {
  @Input() subEntryString : string;
  @Output() onDeleteSubEntry: EventEmitter<any> = new EventEmitter();


  public listItemBody: SafeHtml
  private nouns:string;
  public isQueriable:boolean = false;
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let encodedBodyString = anchorme(this.subEntryString, {attributes:[ /*{name:"target",value:"_blank"}*/]});  //will remove blank
    this.listItemBody = this.sanitizer.bypassSecurityTrustHtml(encodedBodyString);
    this.processListItem()
  }
 
  processListItem() 
  {
    const listItemArray = this.subEntryString.toLowerCase();
   
    const nouns = nlp(this.subEntryString).nouns().data().map(e => {
      let isSingular = true;
      if (listItemArray.includes(e.plural)) {
        isSingular = false;
      }
      return isSingular ? e.singular : e.plural;
    });

    if (nouns.length > 0) {
      this.nouns = nouns.join(' ');
      this.isQueriable = true;
    }

  }

    deleteSubEntry()
    {
      this.onDeleteSubEntry.emit(this.subEntryString);
    }
}

