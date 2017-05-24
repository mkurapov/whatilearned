import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';

import nlp from 'compromise';
import anchorme from 'anchorme';

@Component({
  selector: 'app-single-entry-list-item',
  templateUrl: './single-entry-list-item.component.html',
  styleUrls: ['../../../styles/single-entry-list-item.component.scss']
})
export class SingleEntryListItemComponent implements OnInit {
  @Input() listItem : string;


  public listItemBody: SafeHtml
  public isHoverable:boolean = false;
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let encodedBodyString = anchorme(this.listItem, {attributes:[ /*{name:"target",value:"_blank"}*/]});  //will remove blank
    this.listItemBody = this.sanitizer.bypassSecurityTrustHtml(encodedBodyString);
    this.processListItem()
  }

  isQueriable() 
  {

  }
  
  processListItem() 
  {
    const listItemArray = this.listItem.toLowerCase();
   
    const nouns = nlp(this.listItem).nouns().data().map(e => {
      let isSingular = true;
      if (listItemArray.includes(e.plural)) {
        isSingular = false;
      }
      return isSingular ? e.singular : e.plural;
    });
    
    console.log(nouns);

    
    
    const isUrlEntry = this.listItem.match(/<\/?[^>]+(>|$)/g) ? true : false;

   
      

      //const url ='http://www.google.com/search?q=' + query;
      //window.open(url);

    }
    
    
}

