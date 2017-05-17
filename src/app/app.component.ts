import { Component } from '@angular/core';
import { Entry } from './classes/Entry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles/app.component.scss']
})
export class AppComponent {
  private entries : Entry[]

  constructor()
  {
    this.entries.push(new Entry(1,'dogs',new Date()))
  }
}
