import { Component, Input, OnInit } from '@angular/core';
import { Question } from '@libs/app-interfaces/data';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() currentIndex: number;
  @Input() confirmed: boolean;
  @Input() showQNumber = true;

  constructor() { }

  ngOnInit(): void {
  }

  selectAnswer(id: number) {
    if (this.confirmed) return;
    this.question.userAnswerId = id;
  }
}
