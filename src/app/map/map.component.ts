
import {  AfterViewChecked, Component, Input, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements AfterViewChecked, OnInit{
  @Input() data: any; // decorate the property with @Input()
  map: any;
  private marker_list: L.Marker<any>[] = [];
  private isMapInitialized = false;

  private addMarkers(): void {
    let markers = L.markerClusterGroup({removeOutsideVisibleBounds: true}); 
    if (this.data && this.data.length > 0) {
      this.data.forEach((climb: any) => {
        if (climb['Area Latitude'] && climb['Area Longitude']) {
          const marker = L.marker([climb['Area Latitude'], climb['Area Longitude']]);
          // marker.bindPopup(`<app-result-block [data]="climb"></app-result-block>`)
          marker.bindPopup(`<a href=${climb['URL']} target="_blank"><b>${climb['name']}</b></a> 
                            <br><div>${climb['grade']}   &emsp;  ${climb['rating']} stars </div>
                            ${climb['location']}<br>`);

          this.marker_list.push(marker);
        } else {
          console.error('Latitude and Longitude are required for markers.');
        }
      });
      markers.addLayers(this.marker_list);
      this.map.addLayer(markers);
    } else {
      console.error('Data is required to add markers.');
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,

    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
      
    
  }

  constructor() { }



  ngOnInit() {
    console.log("made");
  }

  ngAfterViewChecked(): void {
    if (!this.isMapInitialized) {
      this.isMapInitialized = true;
      console.log("init");
      this.initMap();
      this.addMarkers();
    }
  }
}
