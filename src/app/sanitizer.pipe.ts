import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SanitizerPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}
 
 public transform(value: any): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {

  return this.sanitizer.bypassSecurityTrustResourceUrl(value);

		
  }
}