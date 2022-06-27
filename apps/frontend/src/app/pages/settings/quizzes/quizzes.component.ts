import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first, firstValueFrom, timeout } from 'rxjs';

import { ApiResponse, HttpMethods } from '@libs/app-interfaces/api';
import { Quiz } from '@libs/app-interfaces/data';

import { MainService } from '@app/core/services/main.service';
import { MainTranslateService } from '@app/core/services/translate-wrapper.service';
import { dtSettings } from '@app/shared/helpers/form/data-table';

import { QuizzesEditComponent } from './quizzes-edit/quizzes-edit.component';
import { QuizsApiService } from '@app/core/services/api/quizzes-api.service';
import { FormEditSaveEmit } from '@app/shared/interfaces/form';
import { ToastService } from '@app/core/services/toastr.service';

@Component({
  selector: 'app-settings-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})

export class QuizzesComponent implements OnInit {

  public data: Quiz[];

  dtSettings: Partial<Table> = {
    ...dtSettings,
    globalFilterFields: ['id', 'name', 'active', 'disciplines.name', 'categories.name'],
  };

  @ViewChild('editComponent') editComponent: QuizzesEditComponent;

  constructor(
    private quizsApiService: QuizsApiService,
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
    const data = await firstValueFrom(this.quizsApiService.getAll(true));
    if (data?.success) return data.data as Quiz[];
    return [];
  }

  openNew() {
    this.editComponent.newItem();
  }

  editItem(item: Quiz) {
    this.editComponent.editItem(item);
  }

  startSave(emit: FormEditSaveEmit<Quiz>) {
    if (emit.mode) {
      this.quizsApiService.update(emit.data as Quiz).pipe(
        first(),
        timeout(10000),
      ).subscribe( resp => this.showToastInfo(resp, HttpMethods.PATCH));
    } else {
      this.quizsApiService.create(emit.data as Quiz).pipe(
        first(),
        timeout(10000),
      ).subscribe( resp => this.showToastInfo(resp, HttpMethods.POST));
    }
  }

  async deleteItem(item: Quiz) {
    this.confirmationService.confirm({
      message: await this.MTService.getTranslate("quizzes.form.delete.popup.message", { name: item.name }),
      header: this.MTService.text.form.delete.popup.title,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-warning',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptLabel: this.MTService.text.delete,
      rejectLabel: this.MTService.text.cancel,
      acceptIcon: "pi pi-trash",
      accept: () => {
        this.quizsApiService.remove(item).pipe(
          first(),
          timeout(10000),
        ).subscribe( resp => this.showToastInfo(resp, HttpMethods.DELETE));
      },
    });
  }

  getSearchValue(event: Event) {
    return (event.target as HTMLInputElement).value
  }

  private showToastInfo(response: ApiResponse<Quiz>, httpMethod: HttpMethods) {
    if (response.success) {
      switch(httpMethod) {
        case HttpMethods.POST: this.toastService.showSuccessToast({ detail: this.MTService.text.quizzes.form.messages.new }); break;
        case HttpMethods.PATCH: this.toastService.showSuccessToast({ detail: this.MTService.text.quizzes.form.messages.edit }); break;
        case HttpMethods.DELETE: this.toastService.showWarningToast({ detail: this.MTService.text.quizzes.form.messages.delete }); break;
      }
      this.refreshDataList();
    }
  }
}
