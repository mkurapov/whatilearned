import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';


@Component({
  selector: 'app-single-entry',
  templateUrl: './single-entry.component.html',
  styleUrls: ['../../../styles/single-entry.component.scss']
})
export class SingleEntryComponent implements OnInit {
  @Input() entry;
  public bodyList: SafeHtml[] = [];
  
  constructor(private sanitizer: DomSanitizer) {

    
    
  }

  ngOnInit() {

    if (this.entry) {
      for (let li of this.entry.body) {
        this.bodyList.push(this.sanitizer.bypassSecurityTrustHtml(li));
      }
    } 

  }

  // trackByFn(index, entry) {

  // }

}
