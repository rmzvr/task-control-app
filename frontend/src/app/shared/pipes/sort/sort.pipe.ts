import { Pipe, PipeTransform } from '@angular/core';

export type Field = 'name' | 'created_date' | 'new' | 'progress' | 'done';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform<T>(array: T[] | null, field: any, order: string = 'asc'): T[] {
    if (array === null || !field) return array as [];

    const el = ['new', 'progress', 'done'];

    const copy = [...array];

    if (field === 'name' || field === 'created_date') {
      copy.sort((a: any, b: any) => {
        return a[field]
          .toLocaleLowerCase()
          .localeCompare(b[field].toLocaleLowerCase());
      });
    } else {
      copy.sort((a: any, b: any) => {
        let aLength = a.lists[el.indexOf(field)].tasks.length;
        let bLength = b.lists[el.indexOf(field)].tasks.length;

        return bLength - aLength;
      });
    }

    return order === 'asc' ? copy : copy.reverse();
  }
}
