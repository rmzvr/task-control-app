import { Directive, HostListener } from '@angular/core';
import { DroppableService } from './droppable.service';

@Directive({
  selector: '[droppable]',
})
export class DroppableDirective {
  constructor(private droppableService: DroppableService) {}

  @HostListener('dragStart', ['$event'])
  public onDragStart(event: PointerEvent): void {
    this.droppableService.onDragStart(event);
  }

  @HostListener('dragEnd', ['$event'])
  public onDragEnd(event: PointerEvent): void {
    this.droppableService.onDragEnd(event);
  }
}
