import {Directive, ElementRef, HostBinding} from '@angular/core';

@Directive({
  selector: '[appElipsis]',
  host: {
    class: 'u-elipsis'
  }
})
export class ElipsisDirective {

  @HostBinding('attr.title')
  get title(): string {
    return this.elementRef.nativeElement.innerHTML;
  }

  constructor(private elementRef: ElementRef) {
  }

}
