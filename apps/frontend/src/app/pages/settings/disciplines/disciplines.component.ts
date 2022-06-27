import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first, firstValueFrom, timeout } from 'rxjs';

import { ApiResponse, HttpMethods } from '@libs/app-interfaces/api';
import { Discipline } from '@libs/app-interfaces/data';

import { MainService } from '@app/core/services/main.service';
import { MainTranslateService } from '@app/core/services/translate-wrapper.service';
import { dtSettings } from '@app/shared/helpers/form/data-table';

import { DisciplinesEditComponent } from './disciplines-edit/disciplines-edit.component';
import { DisciplinesApiService } from '@app/core/services/api/disciplines-api.service';
import { FormEditSaveEmit } from '@app/shared/interfaces/form';
import { ToastService } from '@app/core/services/toastr.service';

@Component({
  selector: 'app-settings-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss'],
})

export class DisciplinesComponent implements OnInit {

  public data: Discipline[];

  dtSettings: Partial<Table> = {
    ...dtSettings,
  };

  @ViewChild('editComponent') editComponent: any;

  constructor(
    private disciplinesApiService: DisciplinesApiService,
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
    const data = await firstValueFrom(this.disciplinesApiService.getAll(true));
    if (data?.success) return data.data as Discipline[];
    return [];
  }

  openNew() {
    this.editComponent.newItem();
  }

  editItem(item: Discipline) {
    this.editComponent.editItem(item);
  }

  startSave(emit: FormEditSaveEmit<Discipline>) {
    if (emit.mode) {
      this.disciplinesApiService.update(emit.data as Discipline).pipe(
        first(),
        timeout(10000),
      ).subscribe( resp => this.showToastInfo(resp, HttpMethods.PATCH));
    } else {
      this.disciplinesApiService.create(emit.data as Discipline).pipe(
        first(),
        timeout(10000),
      ).subscribe( resp => this.showToastInfo(resp, HttpMethods.POST));
    }
  }

  async deleteItem(item: Discipline) {
    this.confirmationService.confirm({
      message: await this.MTService.getTranslate("disciplines.form.delete.popup.message", { name: item.name }),
      header: this.MTService.text.form.delete.popup.title,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-warning',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptLabel: this.MTService.text.delete,
      rejectLabel: this.MTService.text.cancel,
      acceptIcon: "pi pi-trash",
      accept: () => {
        this.disciplinesApiService.remove(item).pipe(
          first(),
          timeout(10000),
        ).subscribe( resp => this.showToastInfo(resp, HttpMethods.DELETE));
      },
    });
  }

  getSearchValue(event: Event) {
    return (event.target as HTMLInputElement).value
  }

  private showToastInfo(response: ApiResponse<Discipline>, httpMethod: HttpMethods) {
    if (response.success) {
      switch(httpMethod) {
        case HttpMethods.POST: this.toastService.showSuccessToast({ detail: this.MTService.text.disciplines.form.messages.new }); break;
        case HttpMethods.PATCH: this.toastService.showSuccessToast({ detail: this.MTService.text.disciplines.form.messages.edit }); break;
        case HttpMethods.DELETE: this.toastService.showWarningToast({ detail: this.MTService.text.disciplines.form.messages.delete }); break;
      }
      this.refreshDataList();
    }
  }
}
