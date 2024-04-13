import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-result-block',
  templateUrl: './result-block.component.html',
  styleUrl: './result-block.component.scss'
})
export class ResultBlockComponent {
  @Input() data: any; // decorate the property with @Input()
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.data['location'] = this.data['location'].split(" >").slice(1,3)
      if(this.data['description'].length > 100){
        this.data['description'] = this.data['description'].slice(0,100)+"...";
      }
    }
  
  }
  navigate(){
    window.open(this.data.URL, '_blank');
  }
}
