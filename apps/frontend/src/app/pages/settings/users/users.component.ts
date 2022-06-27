import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table'
import { ConfirmationService } from 'primeng/api';

import { ApiResponse } from '@libs/app-interfaces/api';
import { User, UserRanks } from '@libs/app-interfaces/data';

import { dtSettings } from '@app/shared/helpers/form/data-table';
import { UsersService } from '@app/core/services/users.service';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { MainService } from '@app/core/services/main.service';
import { MainTranslateService } from '@app/core/services/translate-wrapper.service';
import { FormEditSaveEmit } from '@app/shared/interfaces/form';

@Component({
  selector: 'app-settings-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})

export class UsersComponent implements OnInit {

  public users: Observable<ApiResponse<User[]>>;

  public form: FormGroup;

  public showEditDialog: boolean;

  UserRanks=UserRanks;

  dtSettings: Partial<Table> = {
    ...dtSettings,
    globalFilterFields: ['id','username','name','email'],
  };

  @ViewChild('editComponent') editComponent: UsersEditComponent;

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    public mainService: MainService,
    private MTService: MainTranslateService
  ) { }


  get formControls() {
    return this.form.controls;
  }

  refreshUsers(args:any){
    this.users=this.usersService.getAll();
  }

  async ngOnInit() {
    this.users = this.usersService.getAll();
  }

  openNew() {
    this.editComponent.newItem();
  }

  editItem(item: User) {
    this.editComponent.editItem(item);
  }

  async startSave(emit: FormEditSaveEmit<User>) {
    if (emit.mode) {
      this.usersService.update(emit.data).subscribe(
        success => {
          if (success) this.ngOnInit();
        }
      );
    } else {
      this.usersService.create(emit.data).subscribe(
        success => {
          if (success) this.ngOnInit();
        }
      );
    }
  }

  async deleteItem(item: User) {
    this.confirmationService.confirm({
      message: await this.MTService.getTranslate("users.form.delete.popup.message", { name: item.name }),
      header: this.MTService.text.form.delete.popup.title,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-warning',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptLabel: this.MTService.text.delete,
      rejectLabel: this.MTService.text.cancel,
      acceptIcon: "pi pi-trash",
      accept: () => {
        this.usersService.remove(item).subscribe(
          success => {
            if (success) this.ngOnInit();
          }
        );
      },
    });
  }


  getSearchValue(event: Event) {
    return (event.target as HTMLInputElement).value
  }
}
