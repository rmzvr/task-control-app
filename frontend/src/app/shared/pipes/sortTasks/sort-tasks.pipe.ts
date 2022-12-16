import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '@core/states/tasks';

@Pipe({
  name: 'sortTasks',
})
export class SortTasksPipe implements PipeTransform {
  transform(value: Task[], listID: string): Task[] {
    return value.filter((task: Task) => task.listID === listID);
  }
}
