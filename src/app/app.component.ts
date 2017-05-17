import { Component } from '@angular/core';
import { Entry } from './classes/Entry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles/app.component.scss']
})
export class AppComponent {
  public entries : Entry[] = []

  constructor()
  {
    let newEntry : Entry = 
          {
            id: 1,
            body: 'I learned nothing.',
            date: new Date()
          };

    this.entries.push(newEntry)
  }
}
