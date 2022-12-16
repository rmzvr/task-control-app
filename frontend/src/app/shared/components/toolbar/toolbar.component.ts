import { Component, Input } from '@angular/core';
import { updateOrder, updateSearch, updateSort } from '@core/states/toolbar';
import { Store } from '@ngrx/store';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() public title: string = '';
  @Input() public isDashboardPage!: boolean;

  constructor(private store: Store) {}

  public updateSearchValue(value: string): void {
    this.store.dispatch(updateSearch({ value }));
  }

  public updateSortValue(value: string): void {
    this.store.dispatch(updateSort({ value }));
  }

  public updateOrderValue(value: string): void {
    this.store.dispatch(updateOrder({ value }));
  }
}
