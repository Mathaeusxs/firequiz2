import { Injectable } from '@angular/core';

import { User } from '@libs/app-interfaces/data';

import { environment } from '@environment';

import { filter, Subject, takeUntil } from 'rxjs';
// import { MainStoreService, ProjectsStoreService } from './store';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  currentUser: User;

  private destroy$ = new Subject();

  constructor(
   // private mainStoreService: MainStoreService,
   // private projectStoreService: ProjectsStoreService,
    ) {
    // Do noting

  }


  setUser(user: any) {
    this.currentUser = user;
  }

  logout() {
    this.currentUser = null;
  }

/*
  currentUser$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    ) {
    // Do noting
  }


  setUser(user: any) {
    this.currentUser$.next(user);
  }

  logout() {
    this.currentUser$.next(null);
  } */

}
