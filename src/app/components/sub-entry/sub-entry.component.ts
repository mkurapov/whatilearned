import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';
import { SubEntry } from '../../classes/Entry';

import nlp from 'compromise';
import anchorme from 'anchorme';

@Component({
  selector: 'app-sub-entry',
  templateUrl: './sub-entry.component.html',
  styleUrls: ['../../../styles/sub-entry.component.scss']
})
export class SubEntryComponent implements OnInit {
  @Input() subEntry : SubEntry;
  @Output() onDeleteSubEntry: EventEmitter<any> = new EventEmitter();
  @Output() onHighlightSubEntry: EventEmitter<any> = new EventEmitter();


  public listItemBody: SafeHtml
  public nouns:string;
  public isQueriable:boolean = false;
  
  constructor(private sanitizer: DomSanitizer) { 
  }

  ngOnInit() {
    let encodedBodyString = anchorme(this.subEntry.text, {attributes:[ /*{name:"target",value:"_blank"}*/]});  //will remove blank
    this.listItemBody = this.sanitizer.bypassSecurityTrustHtml(encodedBodyString);
    this.processListItem()
  }
 
  processListItem() 
  {
    const listItemArray = this.subEntry.text.toLowerCase();
   
    const nouns = nlp(this.subEntry.text).nouns().data().map(e => {
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

  highlightSubEntry()
  {
    this.onHighlightSubEntry.emit(this.subEntry);
  }

  deleteSubEntry()
  {
    this.onDeleteSubEntry.emit(this.subEntry);
  }
}

