import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { DefaultCategorie, Categorie } from '@libs/app-interfaces/data';

import { CategoriesApiService } from '@app/core/services/api/categories-api.service';

const FORM_FIELDS = {
  id: null,
  name: [null, [Validators.required]],
  active: null,
  description: null,
}

@Component({
  selector: 'app-settings-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {

  @Input() dialogMode: boolean = false;
  @Input() routeComponentMode: boolean = false;
  @Input() tabsView: boolean = false;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  form: FormGroup;
  showEditDialog = false;
  editMode = false;
  editData: Categorie;
  modResponse: Categorie;

  // Specific component properties

  // Specific component properties * END

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private categorieApiService: CategoriesApiService,
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
      const item = await firstValueFrom(this.categorieApiService.getById(id));
      if (item && item.success) {
        this.editItem(item.data as Categorie)
      }
    } else {
      this.newItem();
    }
  }

  newItem() {
    this.form.reset(DefaultCategorie);
    this.editMode = false;
    this.openDialog();
  }

  editItem(item: Categorie) {
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
        this.categoriesStoreService.update(values);
      } else {
        this.categoriesStoreService.create(values)
      } */
    }
  }

  // Specific component methods

  // Specific component methods * END
}
