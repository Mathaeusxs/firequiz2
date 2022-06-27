import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';

import { DefaultQuestion, Question, Quiz } from '@libs/app-interfaces/data';

import { QuestionsApiService } from '@app/core/services/api/questions-api.service';
import { QuizsApiService } from '@app/core/services/api';
import { ToastService } from '@app/core/services/toastr.service';
import { MainTranslateService } from '@app/core/services/translate-wrapper.service';

const FORM_FIELDS = {
  id: null,
  quizId: [null, [Validators.required]],
  question: [null, [Validators.required]],
  type: null,
  points: [1, [Validators.required]],
  active: null,
}

const FORM_FIELDS_ANSWERS = {
  answer: [null, [Validators.required]],
  correct: null,
  questionsId: null,
  id: null
}

@Component({
  selector: 'app-settings-questions-edit',
  templateUrl: './questions-edit.component.html',
  styleUrls: ['./questions-edit.component.scss'],
})
export class QuestionsEditComponent implements OnInit {

  @Input() dialogMode: boolean = false;
  @Input() routeComponentMode: boolean = false;
  @Input() tabsView: boolean = false;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  form: FormGroup;
  formAnswer: FormGroup;
  showEditDialog = false;
  editMode = false;
  editData: Question;
  modResponse: Question;

  // Specific component properties
  quizzes$: Observable<Quiz[]>;

  // Specific component properties * END

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private questionApiService: QuestionsApiService,
    private quizzesService: QuizsApiService,
    private toastService: ToastService,
    private MTService: MainTranslateService
  ) {
  }

  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  getAnswersFromArray() {
    return this.form.get('answers') as FormArray;
  }

  getAnswersControl(index: number, name: string) {
    return this.getAnswersFromArray().controls[index].get(name) as FormControl;
  }

  addAnswer() {
    const formAnswer = this.formBuilder.group(FORM_FIELDS_ANSWERS)
    this.getAnswersFromArray().push(formAnswer);
  }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      ...FORM_FIELDS,
      answers: this.formBuilder.array([])
    });

    if (this.routeComponentMode) await this.fetchData();
    this.setExtraData();
  }

  private setExtraData() {
    this.quizzes$ = this.quizzesService.getAll().pipe(
      map(data => {
        if (data.success) return data.data
        return []
      })
    )
  }

  private async fetchData() {
    const id = (await firstValueFrom(this.route.params))?.['id'];
    if (id) {
      const item = await firstValueFrom(this.questionApiService.getById(id));
      if (item && item.success) {
        this.editItem(item.data as Question)
      }
    } else {
      this.newItem();
    }
  }

  newItem() {
    this.form.reset(DefaultQuestion);
    this.getAnswersFromArray().clear();
    this.editMode = false;
    this.openDialog();
  }

  removeAnswer(index: number) {
    this.getAnswersFromArray().removeAt(index)
  }

  editItem(item: Question) {
    this.form.reset();
    this.form.patchValue({
      ...item
    });
    this.getAnswersFromArray().clear();
    // this.clearFormArray(this.getAnswersFromArray())
    for(let answer of item.answers) {
      this.addAnswer();
      const index = this.getAnswersFromArray().controls.length - 1;
      this.getAnswersFromArray().controls[index].patchValue(answer)
    }

    this.editMode = true;
    this.editData=item;
    this.openDialog();
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
    console.warn(formArray);
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

    if (!this.haveOneAnswerCorrect(values)) {
      this.toastService.showWarningToast({ detail: this.MTService.text?.questions.form.messages.needOneCorrect })
      return;
    }

    this.closeDialog();
    this.save.emit({
      mode: this.editMode,
      data: values,
    });

    if(this.routeComponentMode) {
      this.location.back();
      // No store
      /* if(this.editMode) {
        this.questionsStoreService.update(values);
      } else {
        this.questionsStoreService.create(values)
      } */
    }
  }

  // Specific component methods
  private haveOneAnswerCorrect(values: Question) {
    for (let answer of values.answers) {
      if (answer.correct) return true;
    }
    return false;
  }
  // Specific component methods * END
}
