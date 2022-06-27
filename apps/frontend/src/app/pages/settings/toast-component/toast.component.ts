
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastMainComponent implements OnInit, OnDestroy {

  toastPosition = { X: 'Right', Y: 'Bottom' };

  destroy$ = new Subject<void>();

  constructor(
    private primengConfig: PrimeNGConfig
  ) {
    // Do nothing
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
