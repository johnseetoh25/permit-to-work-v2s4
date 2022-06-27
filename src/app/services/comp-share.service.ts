import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompShareService {
  private subject = new Subject<any>();

  constructor() { }

  public sendClickEvent(): void {
    this.subject.next();
  }
  
  public getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
