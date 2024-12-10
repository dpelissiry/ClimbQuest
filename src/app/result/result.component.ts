import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { SearchService } from '../search.service';




@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {
  climbs: any;
  style: string = 'results';
  pageItems: number = 20;
  currentPage: number = 0;
  highestPage: number = 0;
  visible: boolean = true;


  constructor(private readonly searchService: SearchService) { }
  ngOnInit() {
    this.climbs = null;
    this.searchService.currentResults.subscribe(results => {
      this.climbs = results;
      this.currentPage = 0;
      if (this.climbs['data'] != null) {
        this.highestPage = Math.floor(this.climbs['data'].length / this.pageItems)
      }
    });
    this.searchService.clearResults();

  }

  reloadResults(direction: number) {
    console.log(this.currentPage, this.highestPage)
    if (direction == -1) {
      this.currentPage--;
    }
    if (direction == 1) {
      this.currentPage++;
    }
  }

  toggleCollapse() {
    this.visible = !this.visible
  }
}
