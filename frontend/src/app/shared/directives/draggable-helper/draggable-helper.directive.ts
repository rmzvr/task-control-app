import {
  GlobalPositionStrategy,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DraggableDirective } from '../draggable/draggable.directive';

@Directive({
  selector: '[draggable-helper]',
  exportAs: 'draggable-helper',
})
export class DraggableHelperDirective implements OnInit, OnDestroy {
  private overlayRef!: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy();
  private startPosition!: { x: number; y: number };

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private draggable: DraggableDirective,
    private overlay: Overlay
  ) {}

  ngOnInit(): void {
    this.draggable.dragStart.subscribe((event) => this.onDragStart(event));
    this.draggable.dragMove.subscribe((event) => this.onDragMove(event));
    this.draggable.dragEnd.subscribe(() => this.onDragEnd());

    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy,
      panelClass: 'draggable-helper-overlay',
    });
  }

  ngOnDestroy(): void {
    this.overlayRef.dispose();
  }

  private onDragStart(event: PointerEvent): void {
    const el = this.draggable.element.nativeElement as HTMLLIElement;
    const clientRect = el.getBoundingClientRect();

    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(
        new TemplatePortal(this.templateRef, this.viewContainerRef)
      );
    }

    this.startPosition = {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top,
    };

    this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  private onDragMove(event: PointerEvent): void {
    this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  private onDragEnd(): void {
    this.overlayRef.detach();
  }
}
