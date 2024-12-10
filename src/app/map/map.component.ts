
import { OnChanges, Component, OnInit, Input, ViewChild, SimpleChanges, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import { BoundsService } from '../bounds.service';
import { LeafletMouseEvent } from 'leaflet';
import { SearchService } from '../search.service';
import { MapZoomService } from '../map-zoom.service';


export interface Bound {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit, OnChanges{
  data: any; // decorate the property with @Input()
  map: any;
  private marker_list: L.Marker<any>[] = [];
  private isMapInitialized: boolean= false;
  private bounds: Bound[] = [];
  private rectangles: any;

  private markers = L.markerClusterGroup({removeOutsideVisibleBounds: true}); 

  // First, remove the layer from the map, then reset the list of markers and the marker cluster group so they arent added back

  constructor(private readonly mapZoomService: MapZoomService, private readonly boundsService: BoundsService, private readonly searchService: SearchService) { }

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

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 4,
      zoomControl: false

    });

    L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(this.map);

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);
    this.map.on("click", (e: L.LeafletMouseEvent) => this.addBound(e));
    // var bounds: L.LatLngBoundsExpression = [[54.559322, -5.767822], [56.1210604, -3.021240]];

    
  }

  private addBound(event: L.LeafletMouseEvent){
    console.log(typeof(event.latlng))
    this.bounds.push({"lat":event.latlng.lat, "lng":event.latlng.lng})
    if (this.bounds.length == 2){
      

      console.log(this.bounds)
      L.rectangle([[this.bounds[0].lat, this.bounds[0].lng],
                  [this.bounds[1].lat, this.bounds[1].lng]], 
                  {color: "#ff7800", weight: 1,
                className: 'rectangle'}).addTo(this.map);
      this.boundsService.updateBounds(this.bounds)
      this.bounds = []
    }
  }


  deleteRectangles(){
    this.rectangles = document.querySelectorAll('.rectangle')
    if(this.rectangles.length > 0){
  
       this.rectangles.forEach((rect: any) => {
          rect.remove();
       });
    }
  }

  ngOnInit(): void{
    this.initMap()
    console.log("map init done")
    this.isMapInitialized = true;

    this.boundsService.boundsOn.subscribe(result =>{
      if (result == false){
        this.deleteRectangles();
      }
      
    });

    this.searchService.mapResults.subscribe(result => {
      if(result['code'] == 200){
        console.log("recieved")
        this.data = result['data']
        this.searchService.clearMap()
        this.deleteMarkers();
        console.log(this.marker_list.length)
        this.addMarkers();
      }
    })
    this.mapZoomService.currentLocation.subscribe(result => {
      if(result != null){
        console.log(result.lat, result.lng)
        this.map.panTo(new L.LatLng(result.lat, result.lng));
        this.mapZoomService.clearLocation();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isMapInitialized) {
      console.log("init")
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
