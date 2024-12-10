import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bound } from './map/map.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  popSearchPost(type: string){
    return this.http.post('http://localhost:3000/pop-search', { type: type })
  }
  searchPost(query: string, type: string | null, bbox: Bound[][], bboxEnabled: boolean){
    return this.http.post('http://localhost:3000/search', { query: query, type: type, bbox: JSON.stringify(bbox), bboxEnabled: bboxEnabled })
  }

  trainingGet(){
    return this.http.get('http://localhost:3000/descriptions')
  }

}
