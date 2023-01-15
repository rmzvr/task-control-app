import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]',
  exportAs: 'autofocus',
})
export class AutofocusDirective {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;

    input.focus();
  }
}
