import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first, firstValueFrom, timeout } from 'rxjs';

import { ApiResponse, HttpMethods } from '@libs/app-interfaces/api';
import { Question } from '@libs/app-interfaces/data';

import { MainService } from '@app/core/services/main.service';
import { MainTranslateService } from '@app/core/services/translate-wrapper.service';
import { dtSettings } from '@app/shared/helpers/form/data-table';

import { QuestionsEditComponent } from './questions-edit/questions-edit.component';
import { QuestionsApiService } from '@app/core/services/api/questions-api.service';
import { FormEditSaveEmit } from '@app/shared/interfaces/form';
import { ToastService } from '@app/core/services/toastr.service';

@Component({
  selector: 'app-settings-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})

export class QuestionsComponent implements OnInit {

  public data: Question[];

  dtSettings: Partial<Table> = {
    ...dtSettings,
    globalFilterFields: ['id', 'question', 'active', 'quiz.name', 'type', 'points'],
  };

  @ViewChild('editComponent') editComponent: QuestionsEditComponent;

  constructor(
    private questionsApiService: QuestionsApiService,
    private confirmationService: ConfirmationService,
    public mainService: MainService,
    private MTService: MainTranslateService,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.refreshDataList();
  }

  private async refreshDataList() {
    this.data = await this.getData();
  }

  private async getData() {
    const data = await firstValueFrom(this.questionsApiService.getAll(true));
    if (data?.success) return data.data as Question[];
    return [];
  }

  openNew() {
    this.editComponent.newItem();
  }

  editItem(item: Question) {
    this.editComponent.editItem(item);
  }

  startSave(emit: FormEditSaveEmit<Question>) {
    if (emit.mode) {
      this.questionsApiService.update(emit.data as Question).pipe(
        first(),
        timeout(10000),
      ).subscribe( resp => this.showToastInfo(resp, HttpMethods.PATCH));
    } else {
      this.questionsApiService.create(emit.data as Question).pipe(
        first(),
        timeout(10000),
      ).subscribe( resp => this.showToastInfo(resp, HttpMethods.POST));
    }
  }

  async deleteItem(item: Question) {
    this.confirmationService.confirm({
      message: this.MTService.text.questions.form.delete.popup.message,
      header: this.MTService.text.form.delete.popup.title,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-warning',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptLabel: this.MTService.text.delete,
      rejectLabel: this.MTService.text.cancel,
      acceptIcon: "pi pi-trash",
      accept: () => {
        this.questionsApiService.remove(item).pipe(
          first(),
          timeout(10000),
        ).subscribe( resp => this.showToastInfo(resp, HttpMethods.DELETE));
      },
    });
  }

  getSearchValue(event: Event) {
    return (event.target as HTMLInputElement).value
  }

  private showToastInfo(response: ApiResponse<Question>, httpMethod: HttpMethods) {
    if (response.success) {
      switch(httpMethod) {
        case HttpMethods.POST: this.toastService.showSuccessToast({ detail: this.MTService.text.questions.form.messages.new }); break;
        case HttpMethods.PATCH: this.toastService.showSuccessToast({ detail: this.MTService.text.questions.form.messages.edit }); break;
        case HttpMethods.DELETE: this.toastService.showWarningToast({ detail: this.MTService.text.questions.form.messages.delete }); break;
      }
      this.refreshDataList();
    }
  }
}
