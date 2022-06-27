import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { DefaultDiscipline, Discipline } from '@libs/app-interfaces/data';

import { DisciplinesApiService } from '@app/core/services/api/disciplines-api.service';

const FORM_FIELDS = {
  id: null,
  name: [null, [Validators.required]],
  active: null,
  description: null,
}

@Component({
  selector: 'app-settings-disciplines-edit',
  templateUrl: './disciplines-edit.component.html',
  styleUrls: ['./disciplines-edit.component.scss'],
})
export class DisciplinesEditComponent implements OnInit {

  @Input() dialogMode: boolean = false;
  @Input() routeComponentMode: boolean = false;
  @Input() tabsView: boolean = false;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  form: FormGroup;
  showEditDialog = false;
  editMode = false;
  editData: Discipline;
  modResponse: Discipline;

  // Specific component properties

  // Specific component properties * END

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private disciplineApiService: DisciplinesApiService,
  ) {
  }

  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  async ngOnInit() {

    this.form = this.formBuilder.group(FORM_FIELDS);

    if (this.routeComponentMode) await this.fetchData();
  }

  private async fetchData() {
    const id = (await firstValueFrom(this.route.params))?.['id'];
    if (id) {
      const item = await firstValueFrom(this.disciplineApiService.getById(id));
      if (item && item.success) {
        this.editItem(item.data as Discipline)
      }
    } else {
      this.newItem();
    }
  }

  newItem() {
    this.form.reset(DefaultDiscipline);
    this.editMode = false;
    this.openDialog();
  }

  editItem(item: Discipline) {
    this.form.reset();
    this.form.patchValue({
      ...item
    });
    this.editMode = true;
    this.editData=item;
    this.openDialog();
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
    if(this.routeComponentMode) {
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

    if(this.routeComponentMode) {
      this.location.back();
      // No store
      /* if(this.editMode) {
        this.disciplinesStoreService.update(values);
      } else {
        this.disciplinesStoreService.create(values)
      } */
    }
  }

  // Specific component methods

  // Specific component methods * END
}
