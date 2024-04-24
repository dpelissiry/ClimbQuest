import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popular-search-block',
  templateUrl: './popular-search-block.component.html',
  styleUrl: './popular-search-block.component.scss'
})
export class PopularSearchBlockComponent {
  @Input() data: any; // decorate the property with @Input()
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.data);
    if (changes['data'] && this.data && this.data['location']) {
      this.data['location'] = this.data['location'].split(" >").slice(1,3)
    }
    //this.data['rows'] = JSON.parse(this.data['rows']);
  
  }
  navigate(url: string){
    console.log();
    window.open(url, '_blank');
  }
}
