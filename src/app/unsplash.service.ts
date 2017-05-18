import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class UnsplashService {

  constructor(private http:Http) {}

  getRandomImage(): Observable<string> {
        return new Observable(observer => {
            let i = new Image();
            i.src = 'https://unsplash.it/1600/?random';
            i.onload = _ => {
                observer.next(i.src);
                observer.complete();
            };
            i.onerror = _ => {
                observer.next('error');
                observer.complete();
            }
        });
        
    }


}
