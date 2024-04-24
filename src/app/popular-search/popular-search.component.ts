import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-popular-search',
  templateUrl: './popular-search.component.html',
  styleUrl: './popular-search.component.scss'
})
export class PopularSearchComponent {
  popularSearches: any;
  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    this.httpService.popSearchPost("boulder")
    .pipe(
      catchError((error) => {
        console.error('Error during search:', error);
        return of([]); // or `throwError` to re-throw, depending on how you want to handle it
      })
    )
    .subscribe(
      (response) => {
        this.popularSearches = response;
      
      //iterate through each row set

      for (let i = 0; i < this.popularSearches.length; i++){
        this.popularSearches[i]['rows'] = JSON.parse(this.popularSearches[i]['rows'])
      }
      });



    
  }
}
