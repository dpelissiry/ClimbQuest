import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapZoomService {

  private locationSource = new BehaviorSubject<any>(null);
  currentLocation = this.locationSource.asObservable();
  constructor() { }

  updateLocation( lat: number, lng: number){
    this.locationSource.next({lat: lat, lng: lng})
  }

  clearLocation(){
    this.locationSource.next(null);
  }
}
