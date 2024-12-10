import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { BoundsService } from '../bounds.service';
import { Bound } from '../map/map.component';

@Component({
  selector: 'app-bounding-box',
  templateUrl: './bounding-box.component.html',
  styleUrl: './bounding-box.component.scss'
})
export class BoundingBoxComponent implements OnInit{
  public bboxEnabled: boolean = false;
  public bounds: Bound[][] = [];

  constructor(private boundsService: BoundsService){}

  ngOnInit(): void {
    this.boundsService.bounds.subscribe(results =>{
      if(results.length == 2){
        this.bounds.push(results);
      }
    });
    this.boundsService.clearBounds();
  }

  updateBBox(event: MatButtonToggleChange){
    console.log(event.value.length)
    console.log(this.bounds)
    if(event.value.length == 1){
      this.bboxEnabled = true;
      //https://leafletjs.com/reference.html#bounds
    }else{
      this.bboxEnabled = false;
      this.bounds = []
    }
    this.boundsService.setBoundsValue(this.bboxEnabled)
  }


}
