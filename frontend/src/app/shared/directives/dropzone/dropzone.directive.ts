import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { DroppableService } from '../droppable/droppable.service';

@Directive({
  selector: '[dropzone]',
})
export class DropzoneDirective implements OnInit {
  @HostBinding('class.dropzone-activated') public activated: boolean = false;
  @HostBinding('class.dropzone-entered') public entered: boolean = false;
  @HostBinding('class.dropzone-default') public default: boolean = false;

  @Output() drop = new EventEmitter<PointerEvent>();

  constructor(private droppableService: DroppableService) {}

  ngOnInit(): void {
    this.droppableService.dragStart$.subscribe(() => this.onDragStart());
    this.droppableService.dragEnd$.subscribe((event) => this.onDragEnd(event));
  }

  @HostListener('mousedown') onMouseDown(): void {
    this.default = true;
  }

  @HostListener('mouseup') onMouseUp(): void {
    this.default = false;
  }

  @HostListener('pointerenter') onPointerEnter(): void {
    if (!this.activated) {
      return;
    }

    this.entered = true;
  }

  @HostListener('pointerover') onPointerOver(): void {
    if (!this.activated) {
      return;
    }

    this.default = true;
    this.entered = true;
  }

  @HostListener('pointerleave') onPointerLeave(): void {
    if (!this.activated) {
      return;
    }

    this.default = false;

    this.entered = false;
  }

  private onDragStart(): void {
    this.activated = true;
  }

  private onDragEnd(event: PointerEvent): void {
    if (this.entered) {
      this.drop.emit(event);
    }

    this.activated = false;
    this.entered = false;
    this.default = false;
  }
}
