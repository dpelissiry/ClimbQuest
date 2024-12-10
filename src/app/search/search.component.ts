import { Component, OnInit, ViewChild} from '@angular/core';

import { SearchService } from '../search.service';
import { HttpService } from '../http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BoundingBoxComponent } from '../bounding-box/bounding-box.component';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',

})
export class SearchComponent implements OnInit {
  //this creates an even emitter so that this search can be reused. Not necessary for this
  //but wanted to try it out

  selectedType: string = "Boulder";
  results :any;
  constructor(private httpService: HttpService, private searchService: SearchService) {}


  ngOnInit(): void {}



  searchClimbs(searchValue: string, selectedType: string) {
    // Find which radio button is selected
    
    // const selectedRadio = radios.find(radio => radio.checked);

    // Get the value of the selected radio button
    // const searchType = selectedRadio ? selectedRadio.value : null;

    //convert the search type to an enum to pass to gpt
    // console.log(selectedRadio.value)
    console.log(searchValue)
    this.httpService.searchPost(searchValue, selectedType)
    .pipe(
      catchError((error) => {
        console.error('Error during search:', error);
        return of([]); // or `throwError` to re-throw, depending on how you want to handle it
      })
    )
    .subscribe(
      (response) => {
        this.searchService.updateResults(response);
      });
        //update results with a searchService

    }
}
