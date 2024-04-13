import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  //this creates an even emitter so that this search can be reused. Not necessary for this
  //but wanted to try it out


  results :any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}



  searchClimbs(searchValue: string, ...radios: HTMLInputElement[]) {
    // Find which radio button is selected
    
    const selectedRadio = radios.find(radio => radio.checked);

    // Get the value of the selected radio button
    const searchType = selectedRadio ? selectedRadio.value : null;

    //convert the search type to an enum to pass to gpt
    this.http.post('http://localhost:3000/search', { query: searchValue, type: searchType })
      .subscribe(response => this.results=response);
    //const query = gpt(searchValue, climb);

    //console.log(query);
  }
}
