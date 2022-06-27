import { Component, ElementRef, Input, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { MainTranslateService } from '@app/core/services/translate-wrapper.service';
import { TranslateText } from '@app/shared/interfaces';

@Component({
  selector: 'app-b-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class BootstrapCustomInputComponent implements OnInit, AfterViewInit {

  @Input() control: FormControl;

  @Input() label: string;
  @Input() type = 'text';
  @Input() focus = false;

  @Input() helpText: string;
  @Input() placeholder = '';
  @Input() floatingLabel = false;

  @Input() required: boolean;

  // ErrorTexts = ErrorFullTexts;

  @ViewChild('inputField', { static: false }) inputField: ElementRef;

  constructor(
    private MTService: MainTranslateService
  ) {
    // Do nothing
  }

  ngAfterViewInit() {
    // Focus Choosen input
    if (this.focus && this.inputField) {
      this.inputField.nativeElement.focus();
    }
  }

  ngOnInit() {
    if (typeof this.required === 'undefined') this.required = this.checkRequired();
  }

  private checkRequired() {
    if (!this.control.validator) return false;

    const listValidators = this.control.validator({}as AbstractControl);
    if (listValidators && listValidators.required) return true;

    return false;
  }

  get controlID() {
    return `id_${this.getFormControlName(this.control)}`;
  }

  get controlName() {
    return this.getFormControlName(this.control);
  }

  private getFormControlName(control: FormControl) {
    const formControls = control.parent.controls;
    return Object.keys(formControls).find((key) => control.parent.get(key) === control) || '';
  }

  getErrorText(name: string){
    return this.MTService.text?.form.validation[name.toLocaleLowerCase() as keyof TranslateText['form']['validation']];
  }
}
