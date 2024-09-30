import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  popSearchPost(type: string){
    return this.http.post('http://localhost:3000/pop-search', { type: type })
  }
  searchPost(query: string, type: string | null){
    return this.http.post('http://localhost:3000/search', { query: query, type: type })
  }
}
