import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appElipsis]',
  host: {
    class: 'u-elipsis',
    '[attr.title]': 'elementRef.nativeElement.innerHTML'
  }
})
export class ElipsisDirective {
  elementRef: ElementRef = inject(ElementRef);
}
