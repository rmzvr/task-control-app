import { Directive, ElementRef, HostListener } from '@angular/core';
import { updateTaskMenuPosition } from '@core/states/modals';
import { Store } from '@ngrx/store';

@Directive({
  selector: '[hover]',
})
export class HoverDirective {
  constructor(private el: ElementRef, private store: Store) {}

  @HostListener('mousedown') onClick() {
    const { x, y, width, height } = this.el.nativeElement
      .closest('.task-item')
      .getBoundingClientRect();

    this.store.dispatch(updateTaskMenuPosition({ x, y, width, height }));
  }
}
