import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private resultsSource = new BehaviorSubject<any>(null);
  currentResults = this.resultsSource.asObservable();

  constructor() { }

  updateResults(data: any) {
    this.resultsSource.next(data);
  }
}
