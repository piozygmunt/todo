import { Directive, ElementRef, HostBinding, inject } from '@angular/core';

@Directive({
  selector: '[appElipsis]',
})
export class ElipsisDirective {
  @HostBinding('class.u-elipsis')
  readonly elipsisClass = true;

  @HostBinding('attr.title')
  get title() {
    return this.elementRef.nativeElement.innerHTML;
  }

  elementRef: ElementRef = inject(ElementRef);
}
