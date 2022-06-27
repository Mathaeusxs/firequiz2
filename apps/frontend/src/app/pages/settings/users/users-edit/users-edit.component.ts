import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { User, UserRanksList, DefaultUser, UserRanks } from '@libs/app-interfaces/data';

import { MainService } from '@app/core/services/main.service';
import { UsersService } from '@app/core/services/users.service';
import { ValidatorMustMatchControls } from '@app/shared/helpers/form/must-match-form-controls';

const FORM_FIELDS = {
  id: null as string,
  username: [null, [Validators.required, Validators.minLength(5)]],
  name: [null, [Validators.required]],
  email: [null, [Validators.required, Validators.email]],
  active: true,
  password: null as string,
  passwordConfirm: null as string,
  passwordChange: false,
  rank: [null, [Validators.required]],
}

@Component({
  selector: 'app-settings-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent {

  @Input() dialogMode = false;
  @Input() routeComponentMode = false;
  @Input() tabsView: boolean = false;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() refresh = new EventEmitter();

  form: FormGroup;
  showEditDialog = false;
  editMode = false;
  editData: User;
  modResponse: User;

  // Specific component properties

  UserRanks = UserRanks;
  UserRanksList= UserRanksList.filter(val=>Number(val)<=this.mainService.currentUser.rank)
  // Specific component properties * END


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location,
    public mainService: MainService,
  ) {
    // Do nothing
  }

  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  async ngOnInit() {
    this.form = this.formBuilder.group(FORM_FIELDS, {
      validator: ValidatorMustMatchControls('password', 'passwordConfirm')
    });

    if (!this.routeComponentMode) await this.fetchData();
  }

  private async fetchData() {
    const id = (await firstValueFrom(this.route.params))?.id;
    if (id) {
      const response = await firstValueFrom(this.usersService.getById(id));
      if (response.success) {
        this.editItem(response.data);
      }
    } else {
      this.newItem();
    }
  }

  newItem() {
    this.form.reset(DefaultUser);
    this.getControl('active').enable();
    this.passwordChangeToggle(true);
    this.editMode = false;
    this.openDialog();
  }

  editItem(item: User) {
    this.form.reset();
    this.form.patchValue({
      ...item
    });
    this.disabledForEditMode(item);
    this.editMode = true;
    this.editData = item;
    this.openDialog();
  }

  private disabledForEditMode(item: User) {
    if (this.mainService.currentUser?.id != item.id &&(this.mainService.currentUser.rank!=UserRanks.SuperAdmin)) {
      this.getControl('active').enable();
      this.getControl('passwordChange').disable();
    } else {
      this.getControl('active').disable();
      this.getControl('passwordChange').enable();
    }
  }

  private openDialog() {
    if (this.dialogMode) {
      this.showEditDialog = true;
    }
  }

  closeDialog() {
    this.showEditDialog = false;
  }

  cancelEmit() {
    this.cancel.emit();

    this.closeDialog();
    if(!this.routeComponentMode) {
      this.location.back();
    }
  }

  async saveEmit() {
    if (this.form.invalid) return;

    const values = this.form.getRawValue();

    this.closeDialog();
    this.save.emit({
      mode: this.editMode,
      data: values,
    });

    if(!this.routeComponentMode) {
      // Mybe EnableDisable this option
      if(this.editMode) {
        this.usersService.update(values);
      } else {
        this.usersService.create(values)
      }
      this.location.back();
    }
  }

  // Specific component methods

  setUserFormPasswordValidation(enable = true) {
    const formControls = this.form.controls;
    if (enable) {
      formControls.password.enable();
      formControls.password.setValidators([
        Validators.required, Validators.minLength(6)
      ]);

      formControls.passwordConfirm.enable();
      formControls.password.setValidators([
        Validators.required, Validators.minLength(6)
      ]);
    } else {
      formControls.password.disable();
      formControls.password.clearValidators();

      formControls.passwordConfirm.disable();
      formControls.passwordConfirm.clearValidators();
    }
  }

  passwordChangeToggle(checked: boolean) {
    this.setUserFormPasswordValidation(checked);
  }

  // Specific component methods * END

}
