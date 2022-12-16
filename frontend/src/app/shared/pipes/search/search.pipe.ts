import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any | null, searchString: any, searchType: any): any | null {
    if (value === null || !searchString || !searchType) return value;

    if (searchType === 'board') {
      const copy = [...value];

      const filteredBoards = copy.filter((board: any) =>
        board.name
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase())
      );

      return filteredBoards;
    }

    if (searchType === 'task') {
      const filteredTasks = [...value].filter((task: any) =>
        task.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
      );

      return filteredTasks;
    }
  }
}
