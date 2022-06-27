import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';

import { Categorie, DefaultQuiz, Discipline, Quiz } from '@libs/app-interfaces/data';

import { QuizsApiService } from '@app/core/services/api/quizzes-api.service';
import { CategoriesApiService, DisciplinesApiService } from '@app/core/services/api';

const FORM_FIELDS = {
  id: null,
  disciplinesId: null,
  categoriesId: null,
  name: [null, [Validators.required]],
  active: null,
}

@Component({
  selector: 'app-settings-quizzes-edit',
  templateUrl: './quizzes-edit.component.html',
  styleUrls: ['./quizzes-edit.component.scss'],
})
export class QuizzesEditComponent implements OnInit {

  @Input() dialogMode: boolean = false;
  @Input() routeComponentMode: boolean = false;
  @Input() tabsView: boolean = false;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  form: FormGroup;
  showEditDialog = false;
  editMode = false;
  editData: Quiz;
  modResponse: Quiz;

  // Specific component properties
  categories$: Observable<Categorie[]>;
  disciplines$: Observable<Discipline[]>;
  // Specific component properties * END

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private quizApiService: QuizsApiService,
    private categoriesService: CategoriesApiService,
    private disciplinesService: DisciplinesApiService,
  ) {
  }

  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  async ngOnInit() {
    this.form = this.formBuilder.group(FORM_FIELDS);

    if (this.routeComponentMode) await this.fetchData();

    this.setExtraData();
  }

  private setExtraData() {
/*     this.categories = (await firstValueFrom(this.categoriesService.getAll())).data;
    this.disciplines = (await firstValueFrom(this.disciplinesService.getAll())).data; */

    this.categories$ = this.categoriesService.getAll().pipe(
      map(data => {
        if (data.success) return data.data
        return []
      })
    )
    this.disciplines$ = this.disciplinesService.getAll().pipe(
      map(data => {
        if (data.success) return data.data
        return []
      })
    )
  }

  private async fetchData() {
    const id = (await firstValueFrom(this.route.params))?.['id'];
    if (id) {
      const item = await firstValueFrom(this.quizApiService.getById(id));
      if (item && item.success) {
        this.editItem(item.data as Quiz)
      }
    } else {
      this.newItem();
    }
  }

  newItem() {
    this.form.reset(DefaultQuiz);
    this.editMode = false;
    this.openDialog();
  }

  editItem(item: Quiz) {
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
        this.quizsStoreService.update(values);
      } else {
        this.quizsStoreService.create(values)
      } */
    }
  }

  // Specific component methods

  // Specific component methods * END
}
