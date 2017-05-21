import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';


@Component({
  selector: 'app-single-entry',
  templateUrl: './single-entry.component.html',
  styleUrls: ['../../../styles/single-entry.component.scss']
})
export class SingleEntryComponent implements OnInit {
  @Input() entry;
  public entryBody: SafeHtml;
  
  constructor(private sanitizer: DomSanitizer) {

    
    
  }

  ngOnInit() {

    if (this.entry){
      this.entryBody = this.sanitizer.bypassSecurityTrustHtml(this.entry.body);
      console.log(this.entryBody)
    } 

  }

}
