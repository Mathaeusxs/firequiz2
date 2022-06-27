import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CrossTickComponent } from './components/cross-tick/cross-tick.component';

import { BootstrapCustomInputComponent } from './components/b-custom-input/custom-input.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    CrossTickComponent,
    BootstrapCustomInputComponent,
  ],
  providers: [
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CrossTickComponent,
    BootstrapCustomInputComponent,
    TranslateModule
  ]
})

export class SharedMainModule { }

