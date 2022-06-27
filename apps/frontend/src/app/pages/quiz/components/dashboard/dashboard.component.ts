import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Categorie, Discipline, QuickParams, Quiz } from '@libs/app-interfaces/data';

import { requireCheckboxesToBeCheckedValidator } from '../../scripts/form-custom.validator';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  num_questions = 10;
  countdown = 5;
  enable_countdown = false;

  quickForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public dashServ: DashboardService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createQuickForm();
  }

  openQuiz(cat: Categorie, dis: Discipline, questions = this.num_questions, countdown = this.countdown) {
    const quiz = this.findQuiz(cat, dis) as Quiz;

    if (!quiz) return;

    if (!this.enable_countdown) {
      countdown = 0;
    }
    this.router.navigate([`../questions/${quiz.id}/${questions}/${countdown}`], { relativeTo: this.route })
  }

  private createQuickForm() {
    this.quickForm = this.formBuilder.group({
      categories: this.formBuilder.group(
        this.getCategorieFormFileds(), {
          validators: [Validators.required, requireCheckboxesToBeCheckedValidator()]
        },
      ),
      disciplines: this.formBuilder.group(
        this.getDisciplineFormFileds(), {
          validators: [Validators.required, requireCheckboxesToBeCheckedValidator()]
        }
      ),
      num_questions: [10, [Validators.required, Validators.min(1)]],
      enable_countdown: true,
      countdown: [3, [Validators.required, Validators.min(0.1)]],
    });
  }

  private getCategorieFormFileds(): { [key: string]: object; } {
    const fileds: { [key: string]: object; } = {};
    for (let cat of this.dashServ.categories ) {
      fileds[`c_${cat.id}`] = [true, null]
    }
    return fileds;
  }

  private getDisciplineFormFileds(): { [key: string]: object; } {
    const fileds: { [key: string]: object; } = {};
    for (let dis of this.dashServ.disciplines) {
      fileds[`d_${dis.id}`] = [true, null]
    }
    return fileds;
  }

  quickFormSubmit() {
    if( this.quickForm.invalid ) return;

    const values = this.quickForm.value;

    if (!values.enable_countdown) {
      values.countdown = 0;
    }

    const sCats = [];
    for(let c of this.dashServ.categories) {
      if (values.categories['c_'+c.id]) sCats.push(c)
    }
    values.categories = sCats;

    const sDis = [];
    for(let c of this.dashServ.disciplines) {
      if (values.disciplines['d_'+c.id]) sDis.push(c)
    }
    values.disciplines = sDis;

    this.router.navigate([`../questions/quick-quiz`], { state: values as QuickParams, relativeTo: this.route });
  }

  findQuiz(cat: Categorie, dis: Discipline) {
    for (let q of this.dashServ.quizzes) {
      if (q.disciplinesId === dis.id
        && q.categoriesId === cat.id) return q;
    }
    return false;
  }
}
