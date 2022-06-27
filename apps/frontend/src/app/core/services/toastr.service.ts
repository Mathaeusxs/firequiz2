import { Injectable } from '@angular/core';

import { MessageService, Message } from 'primeng/api';
import { MainTranslateService } from './translate-wrapper.service';

@Injectable()
export class ToastService {

  // toastShowLine$: Subject<Message> = new Subject();

  constructor(
    private messageService: MessageService,
    private MTService: MainTranslateService
  ) {
    // Do nothing
  }

  clearAll(){
    this.messageService.clear();
  }

  showToast(model: Message) {
    if (!model.key) model.key = 'bottom-right'
    // this.toastShowLine$.next(model)
    this.messageService.add(model);
    return model;
  }

  showSuccessToast(model: Message) {
    if (!model.summary) model.summary = this.MTService.text?.toast.title.success;

    model.severity = 'success';
    return this.showToast(model);
  }

  showDangerToast(model: Message) {
    if (!model.summary) model.summary =  this.MTService.text?.toast.title.error;

    model.severity = 'error';
    model.life = 8000;
    return this.showToast(model);
  }

  showWarningToast(model: Message) {
    if (!model.summary) model.summary =  this.MTService.text?.toast.title.warning;

    model.severity = 'warn';
    model.icon = 'e-warning toast-icons';
    return this.showToast(model);
  }

  showInfoToast(model: Message) {
    if (!model.summary) model.summary =  this.MTService.text?.toast.title.info;

    model.severity = 'info';
    return this.showToast(model);
  }

}
