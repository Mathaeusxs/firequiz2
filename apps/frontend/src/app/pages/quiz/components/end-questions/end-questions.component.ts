import { Component, Input, OnInit } from '@angular/core';
import { Question } from '@libs/app-interfaces/data';

@Component({
  selector: 'app-end-questions',
  templateUrl: './end-questions.component.html',
  styleUrls: ['./end-questions.component.scss']
})
export class EndQuestionsComponent implements OnInit {

  @Input() questions: Question[];

  constructor() { }

  ngOnInit(): void {
  }

}
