import { Component, Input } from '@angular/core';
import { setCurrentTask, Task, updateTask } from '@core/states/tasks';
import { Store } from '@ngrx/store';

@Component({
  selector: 'description-section',
  templateUrl: './description-section.component.html',
  styleUrls: ['./description-section.component.scss'],
})
export class DescriptionSectionComponent {
  @Input() task!: Task;

  public isDescriptionFormOpen: boolean = false;

  constructor(private store: Store) {}

  public toggleDescriptionForm(): void {
    this.isDescriptionFormOpen = !this.isDescriptionFormOpen;
  }

  public updateDescription(value: string): void {
    this.store.dispatch(
      updateTask({
        task: { ...this.task, description: value },
      })
    );
  }

  public setCurrentTask(value: string): void {
    this.store.dispatch(
      setCurrentTask({
        task: { ...this.task, description: value },
      })
    );
  }
}
