import { Component, OnInit, ViewChild} from '@angular/core';

import { SearchService } from '../search.service';
import { HttpService } from '../http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BoundingBoxComponent } from '../bounding-box/bounding-box.component';

@Component({
  selector: 'app-small-search',
  templateUrl: './small-search.component.html',
  styleUrl: './small-search.component.scss'
})
export class SmallSearchComponent implements OnInit {


  selectedType: string = "Boulder";
  results :any;
  constructor(private httpService: HttpService, private searchService: SearchService) {}


  ngOnInit(): void {}



  @ViewChild(BoundingBoxComponent) child: any;
  searchClimbs(searchValue: string, selectedType: string) {
    // Find which radio button is selected
    
    // const selectedRadio = radios.find(radio => radio.checked);

    // Get the value of the selected radio button
    // const searchType = selectedRadio ? selectedRadio.value : null;

    //convert the search type to an enum to pass to gpt


    console.log(this.child.bounds)
    this.httpService.searchPost(searchValue, selectedType, this.child.bounds, this.child.bboxEnabled)
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
