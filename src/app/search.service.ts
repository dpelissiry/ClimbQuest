import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private resultsSource = new BehaviorSubject<any>({'code':199});
  private mapSource = new BehaviorSubject<any>({'code':199});
  currentResults = this.resultsSource.asObservable();
  mapResults = this.resultsSource.asObservable();

  constructor() { }

  updateResults(data: any) {
    this.resultsSource.next(data);
    this.mapSource.next(data)
  }
  clearResults() {
    this.resultsSource.next({'code' : 199});

  } 
  clearMap(){
    this.mapSource.next({'code' : 199})
  }
}
