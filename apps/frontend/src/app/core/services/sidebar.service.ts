import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainSidebarService {

  sidebarVisible$ = new BehaviorSubject<boolean>(true);

  constructor(
    ) {
  }

  closeSidebar() {
    this.sidebarVisible$.next(false);
  }

  openSidebar() {
    this.sidebarVisible$.next(true);
  }

  async toggleSidebar() {
    const current = await firstValueFrom(this.sidebarVisible$)
    this.sidebarVisible$.next(!current);
  }
}
