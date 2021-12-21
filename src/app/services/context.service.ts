import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Generic service to store states between components

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  public sidenavOpened$ = new BehaviorSubject<boolean>(false);
}
