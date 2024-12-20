import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common';
import { SafePipe } from 'safe-pipe';

@Component({
  selector: 'app-result-block',
  templateUrl: './result-block.component.html',
  styleUrl: './result-block.component.scss',
})
export class ResultBlockComponent {
  @Input() data: any; // decorate the property with @Input()
  public hover: boolean = false;
  constructor() {}
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['data'] && this.data && this.data['location']) {
  //     this.data['location'] = this.data['location'].split(" >").slice(1,3)
  //     if(this.data['description'].length > 100){
  //       this.data['description'] = this.data['description'].slice(0,100)+"...";
  //     }
  //   }
  
  // }

  showVideo(){
    if (this.data['youtube'] != null) {this.hover = true} 
  }

  navigate(){
    window.open(this.data.URL, '_blank');
  }
}
