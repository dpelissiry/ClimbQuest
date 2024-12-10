import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bound } from './map/map.component';

@Injectable({
  providedIn: 'root'
})
export class BoundsService {
  private boundsSource = new BehaviorSubject<Bound[]>([]);
  private boundsEnabled = new BehaviorSubject<boolean>(false);

  boundsOn = this.boundsEnabled.asObservable();
  bounds = this.boundsSource.asObservable();

  constructor() { }

  updateBounds(data: Bound[]){
    this.boundsSource.next(data)
    console.log(this.bounds)
  }
  clearBounds(){
    this.boundsSource.next([])
  }

  setBoundsValue(value: boolean){
    this.boundsEnabled.next(value);
  }

}
