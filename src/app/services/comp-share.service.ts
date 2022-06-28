import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompShareService {
  private clickSubject = new Subject<any>();

  constructor() { }

  public sendClickEvent(): void {
    this.clickSubject.next();
  }
  
  public getClickEvent(): Observable<any> { 
    return this.clickSubject.asObservable();
  }
}
