import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SearchService } from '../search.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  climbs: any;
  constructor(private searchService: SearchService) {}
  ngOnInit() {
    this.searchService.currentResults.subscribe(results => {
      this.climbs = results;
    });
  }
}
