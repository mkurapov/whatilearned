import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Entry } from '../../classes/Entry';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['../../../styles/input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  //NEED TO ADD FORM VALIDATION
  @Output() onSubmitEntry: EventEmitter<any> = new EventEmitter();
  private inputBody : string;

  constructor() { }

  ngOnInit() {
  }

  submitEntry()
  {
    let newEntry = {
      id: Math.random(),
      body: this.inputBody,
      date: new Date()
    }


    console.log(newEntry)
    this.onSubmitEntry.emit()
    this.inputBody = ""
  }

  

 
  

}
