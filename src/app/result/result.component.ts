import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  climbs: any;
  @Input() searchData: any={data:null}; // decorate the property with @Input()
  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchData'] && changes['searchData'].currentValue !== undefined) {
      this.climbs = this.searchData['data']
    }
  }

}
