import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizsApiService } from '@app/core/services/api';
import { Question, QuickParams, Quiz, QuizRouteParams } from '@libs/app-interfaces/data';

import { firstValueFrom, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  params: QuizRouteParams;

  questions: Question[] = [];

  currentIndex: number = 0;
  quiz: Quiz;

  confirmed = false;
  endQuiz = false;
  showQuestions = false;

  quickData!: QuickParams;

  counter = 0;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dashServ: DashboardService,
    private quizsApiService: QuizsApiService,
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) this.quickData = navigation?.extras.state as QuickParams;
   }

  ngOnInit(): void {
    this.resetQuiz();

    if (!this.quickData) {
      this.getParameters();
    } else {
      // Its QuickQuiz
      this.newQuickQuiz(this.quickData)
    }
  }

  ngOnDestroy() {
    this.resetQuiz();
    this.destroy$.next(null);
  }

  resetQuiz() {
    this.questions = [];
    this.currentIndex = 0;
    this.confirmed = false;
    this.endQuiz = false;
  }

  getParameters() {
    this.activeRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      params => {
        this.newQuiz(params as QuizRouteParams);
      }
    )
  }

  private async newQuiz(params: QuizRouteParams) {
    // Get Quiz
    this.quiz = await firstValueFrom(this.quizsApiService.getById(params.quizId).pipe(
      map(r => {
        if(r.success) return r.data;
        return null;
      })
    ));

    // GetQuestions
    if (this.quiz) {
      this.questions = await firstValueFrom(this.dashServ.getQuizQuestions(this.quiz, params.num_questions).pipe(
        map(r => {
          if (r.success) return r.data;
          this.router.navigate(['/quiz/dashboard']);
          return [];
        }))
      )

      this.quiz.points = 0;

      if (params.countdown && params.countdown > 0) {
        this.startCountdown(params.countdown * 60)
      }
    } else {
      this.router.navigate(['/quiz/dashboard'])
    }
  }

  private async newQuickQuiz(params: QuickParams) {

    this.questions = await firstValueFrom(this.dashServ.getQuickQuizQuestions(params.categories, params.disciplines, params.num_questions).pipe(
      map(r => {
        if (r.success) return r.data;
        this.router.navigate(['/quiz/dashboard']);
        return [];
      }))
    )

    if (this.questions && this.questions.length > 0) {
      this.quiz = {
        questions: this.questions,
        currentIndex: 0,
        name: 'Hitri kviz',
        points: 0
      } as Quiz

      if (params.countdown && params.countdown > 0) {
        this.startCountdown(params.countdown * 60)
      }
    }
  }


/*     const c = this.dashServ.categories.find(c => c.id === params.categorie);

    this.params = {
      ...params,
      names: {
        categorie: this.dashServ.categories.find(c => c.id === params.categorie),
        discipline: this.dashServ.disciplines.find(c => c.id === params.discipline),
      }
    } as QuizRouteParams; */

    // this.params.categorie;
    // this.params.discipline;

   /*  const quiz = this.quizService.generateQuiz(this.params);
    if(quiz) {
      this.quiz = quiz;
      this.currentIndex = quiz.currentIndex;
      this.questions = quiz.questions;

      if (params.countdown && params.countdown > 0) {
        this.startCountdown(params.countdown * 60)
      }
    } else {
      this.router.navigate(['/dashboard'])
    } */


  private startCountdown(counter: number) {
    this.counter = counter;
    const intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      if(this.counter === 0) {
        this.quizEnd();
        clearInterval(intervalId);
      }
    }, 1000);
  }

  confirmQuestion() {
    this.confirmed = true;

    // Check Question
    const question = this.questions[this.currentIndex];

    const selectedAnswer = question.answers.find( a => a.id === question.userAnswerId);

    if (selectedAnswer && selectedAnswer.correct) {
      question.userAnswerCorrect = true;
      this.quiz.points = this.quiz.points + question.points;
    }
    else question.userAnswerCorrect = false;
  }

  nextQuestion() {
    this.confirmed = false;

    if (this.currentIndex === this.questions.length - 1) {
      this.quizEnd();
      return;
    }

    this.currentIndex = this.currentIndex + 1;
  }

  isSelected() {
    return typeof this.questions[this.currentIndex]?.userAnswerId === 'undefined' ? false : true;
  }

  quizEnd() {
    this.endQuiz = true;
  }

}
