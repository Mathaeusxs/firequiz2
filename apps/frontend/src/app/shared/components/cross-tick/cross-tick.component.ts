import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cross-tick',
  templateUrl: './cross-tick.component.html',
  styleUrls: ['./cross-tick.component.scss']
})
export class CrossTickComponent implements OnInit {

  @Input() value: boolean | string;

  constructor() {
    // Do nothing
  }

  ngOnInit() {
    if (this.value === 'true') {
      this.value = true;
    } else if (this.value === 'false')  {
      this.value = false;
    }
  }

}
