import { Component, Input, OnInit } from '@angular/core';
import { MapZoomService } from '../map-zoom.service';

@Component({
  selector: 'app-small-result-block',
  templateUrl: './small-result-block.component.html',
  styleUrl: './small-result-block.component.scss'
})
export class SmallResultBlockComponent {
  @Input() data: any; // decorate the property with @Input()
  public hover: boolean = false;
  constructor(private readonly mapZoomService: MapZoomService) {}

  ngOnInit(){
    const desc_split = this.data.location.split(' > ')
    this.data.location = desc_split[0] + " > " + desc_split[1]+ " > "+desc_split.slice(-1)

  }

  showVideo(){
    if (this.data['youtube'] != null) {this.hover = true} 
  }

  navigate(){
    window.open(this.data.URL, '_blank');
  }

  zoomMap(){
    this.mapZoomService.updateLocation(this.data['Area Latitude'], this.data['Area Longitude'])
  }
}
