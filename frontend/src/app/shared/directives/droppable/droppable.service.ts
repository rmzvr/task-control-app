import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DroppableService {
  public dragStart$!: Observable<PointerEvent>;
  public dragEnd$!: Observable<PointerEvent>;

  private dragStartSubject = new Subject<PointerEvent>();
  private dragEndSubject = new Subject<PointerEvent>();

  constructor() {
    this.dragStart$ = this.dragStartSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
  }

  public onDragStart(event: PointerEvent): void {
    this.dragStartSubject.next(event);
  }

  public onDragEnd(event: PointerEvent): void {
    this.dragEndSubject.next(event);
  }
}
