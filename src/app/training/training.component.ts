import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent {
  tags = ['crimps', 'dyno', 'roof', 'stem', ''];
  description = ["hey", "hi"];
  n = 0;

  constructor(private httpService: HttpService){}

  ngOnInit(){

  }
}
