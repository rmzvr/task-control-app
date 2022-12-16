import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[draggable], [droppable]',
})
export class DraggableDirective {
  @HostBinding('class.draggable') draggable: boolean = true;
  @HostBinding('class.dragging') dragging: boolean = false;
  @HostBinding('class.entered') entered: boolean = false;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  private timeout: any;

  constructor(public element: ElementRef) {}

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    event.stopPropagation();

    this.timeout = setTimeout(() => {
      this.dragging = true;
      this.dragStart.emit(event);
    }, 170);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(): void {
    clearTimeout(this.timeout);
  }

  @HostListener('pointerenter', ['$event'])
  onPointerEnter(event: PointerEvent): void {
    if (!this.draggable) {
      return;
    }

    this.entered = true;
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragMove.emit(event);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    clearTimeout(this.timeout);

    if (!this.dragging) {
      return;
    }

    this.dragging = false;

    this.dragEnd.emit(event);
  }
}
