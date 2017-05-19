import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Entry } from '../../classes/Entry';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['../../../styles/input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  //NEED TO ADD FORM VALIDATION
  @Output() onSubmitEntry: EventEmitter<any> = new EventEmitter();

  public inputBody : string;
  public isShrunk : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  submitEntry()
  {
    let newEntry = {
      id: Math.random(),
      body:"",
      date: new Date()
    }

    newEntry.body = this.inputBody;


    console.log(newEntry)
    this.onSubmitEntry.emit(newEntry)
    this.inputBody = ""
  }


  @HostListener("window:scroll", ['$event']) onWindowScroll(event: Event) 
  {
    let scrollPosition = document.body.scrollTop;

    if (scrollPosition > 400){
      this.isShrunk = true;
    }
    else {
      this.isShrunk = false;
    }
  }

  

 
  

}
