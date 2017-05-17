import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-entry',
  templateUrl: './single-entry.component.html',
  styleUrls: ['../../../styles/single-entry.component.scss']
})
export class SingleEntryComponent implements OnInit {
  @Input() entry;
  
  constructor() { }

  ngOnInit() {
  }

}
