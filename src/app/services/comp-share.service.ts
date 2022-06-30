import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompShareService {
  private clickSubject = new Subject<any>();
  private homeTitleAsSignOutEvent = new Subject<any>();
  private homeTitleAsNavEvent = new Subject<any>();

  constructor() { }

  public sendClickEvent(): void {
    this.clickSubject.next();
  }
  
  public getClickEvent(): Observable<any> { 
    return this.clickSubject.asObservable();
  }

  public sendHomeTitleAsSignOutEvent(): void {
    this.homeTitleAsSignOutEvent.next();
  }

  public getHomeTitleAsSignOutEvent(): Observable<void> {
    return this.homeTitleAsSignOutEvent.asObservable();
  }

  public sendHomeTitleAsNavEvent(): void {
    this.homeTitleAsNavEvent.next();
  }

  public getHomeTitleAsNavEvent(): Observable<void> {
    return this.homeTitleAsNavEvent.asObservable();
  }
}
