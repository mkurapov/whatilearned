import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Entry } from '../../classes/Entry';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['../../../styles/input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  public newEntryForm: FormGroup

  //NEED TO ADD FORM VALIDATION
  @Output() onSubmitEntry: EventEmitter<any> = new EventEmitter();

  public inputBody : string;
  public isShrunk : boolean = false;

  constructor() { }

  ngOnInit() 
  {
    let newEntryInput = new FormControl('', [Validators.required, Validators.minLength(1)]);
    this.newEntryForm = new FormGroup({
      newEntryInput: newEntryInput
    })
  }

  submitEntry(formValues)
  {
    //console.log(formValues)
    if (this.newEntryForm.valid) {

      const trimmedInput = formValues.newEntryInput.trim();

      if (trimmedInput !== '') {
        this.onSubmitEntry.emit(trimmedInput)
      }   
      this.newEntryForm.reset()
    }
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
