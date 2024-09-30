
import {  AfterViewChecked, OnChanges, Component, Input, OnInit, ViewChild, SimpleChanges} from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnChanges{
  @Input() data: any; // decorate the property with @Input()
  map: any;
  private marker_list: L.Marker<any>[] = [];
  private isMapInitialized = false;

  private markers = L.markerClusterGroup({removeOutsideVisibleBounds: true}); 

  // First, remove the layer from the map, then reset the list of markers and the marker cluster group so they arent added back

  private deleteMarkers(): void{
    this.map.removeLayer(this.markers);
    this.markers = L.markerClusterGroup({removeOutsideVisibleBounds: true});
    this.marker_list = [];
  }

  private addMarkers(): void {
    if (this.data && this.data.length > 0) {
      this.data.forEach((climb: any) => {
        if (climb['Area Latitude'] && climb['Area Longitude']) {
          const marker = L.marker([climb['Area Latitude'], climb['Area Longitude']]);
          // marker.bindPopup(`<app-result-block [data]="climb"></app-result-block>`)
          marker.bindPopup(`
                          <div style="font-family: Arial, sans-serif; color: #333; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                            <a href="${climb['URL']}" target="_blank" style="text-decoration: none; color: #0066cc;">
                              <b style="font-size: 18px;">${climb['name']}</b>
                            </a>
                            <br>
                            <div style="margin-top: 8px; font-size: 14px;">
                              <span style="font-weight: bold;">Grade:</span> ${climb['grade']}
                            </div>
                            <div style="margin-top: 5px; font-size: 14px;">
                              <span style="font-weight: bold;">Rating:</span> ${climb['rating']} stars
                            </div>
                            <div style="margin-top: 5px; font-size: 14px; color: #555;">
                              <span style="font-weight: bold;">Location:</span> ${climb['location']}
                            </div>
                          </div>
                        `);


          this.marker_list.push(marker);
        } else {
          console.error('Latitude and Longitude are required for markers.');
        }
      });
      this.markers.addLayers(this.marker_list);
      this.map.addLayer(this.markers);
    } else {
      console.error('Data is required to add markers.');
    }
  }
  public fullscreenOptions: FullscreenOptions = {};

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,

    });

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    tiles.addTo(this.map);
      
    
  }

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isMapInitialized) {
      this.isMapInitialized = true;
      this.initMap();
      this.addMarkers();
    }
    else{
      this.deleteMarkers();
      console.log(this.marker_list.length)
      this.addMarkers();
    }
  }
}
