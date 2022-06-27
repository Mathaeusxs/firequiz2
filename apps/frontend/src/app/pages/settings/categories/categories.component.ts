import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first, firstValueFrom, timeout } from 'rxjs';

import { ApiResponse, HttpMethods } from '@libs/app-interfaces/api';
import { Categorie } from '@libs/app-interfaces/data';

import { MainService } from '@app/core/services/main.service';
import { MainTranslateService } from '@app/core/services/translate-wrapper.service';
import { dtSettings } from '@app/shared/helpers/form/data-table';

import { CategoriesEditComponent } from './categories-edit/categories-edit.component';
import { CategoriesApiService } from '@app/core/services/api/categories-api.service';
import { FormEditSaveEmit } from '@app/shared/interfaces/form';
import { ToastService } from '@app/core/services/toastr.service';

@Component({
  selector: 'app-settings-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})

export class CategoriesComponent implements OnInit {

  public data: Categorie[];

  dtSettings: Partial<Table> = {
    ...dtSettings,
  };

  @ViewChild('editComponent') editComponent: any;

  constructor(
    private categoriesApiService: CategoriesApiService,
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
    const data = await firstValueFrom(this.categoriesApiService.getAll(true));
    if (data?.success) return data.data as Categorie[];
    return [];
  }

  openNew() {
    this.editComponent.newItem();
  }

  editItem(item: Categorie) {
    this.editComponent.editItem(item);
  }

  startSave(emit: FormEditSaveEmit<Categorie>) {
    if (emit.mode) {
      this.categoriesApiService.update(emit.data as Categorie).pipe(
        first(),
        timeout(10000),
      ).subscribe( resp => this.showToastInfo(resp, HttpMethods.PATCH));
    } else {
      this.categoriesApiService.create(emit.data as Categorie).pipe(
        first(),
        timeout(10000),
      ).subscribe( resp => this.showToastInfo(resp, HttpMethods.POST));
    }
  }

  async deleteItem(item: Categorie) {
    this.confirmationService.confirm({
      message: await this.MTService.getTranslate("categories.form.delete.popup.message", { name: item.name }),
      header: this.MTService.text.form.delete.popup.title,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-warning',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptLabel: this.MTService.text.delete,
      rejectLabel: this.MTService.text.cancel,
      acceptIcon: "pi pi-trash",
      accept: () => {
        this.categoriesApiService.remove(item).pipe(
          first(),
          timeout(10000),
        ).subscribe( resp => this.showToastInfo(resp, HttpMethods.DELETE));
      },
    });
  }

  getSearchValue(event: Event) {
    return (event.target as HTMLInputElement).value
  }

  private showToastInfo(response: ApiResponse<Categorie>, httpMethod: HttpMethods) {
    if (response.success) {
      switch(httpMethod) {
        case HttpMethods.POST: this.toastService.showSuccessToast({ detail: this.MTService.text.categories.form.messages.new }); break;
        case HttpMethods.PATCH: this.toastService.showSuccessToast({ detail: this.MTService.text.categories.form.messages.edit }); break;
        case HttpMethods.DELETE: this.toastService.showWarningToast({ detail: this.MTService.text.categories.form.messages.delete }); break;
      }
      this.refreshDataList();
    }
  }
}
