import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarState } from '@core/models/toolbar.models';
import { updateOrder, updateSearch, updateSort } from '@core/states/toolbar';

describe('ToolbarComponent', () => {
  let fixture: ComponentFixture<ToolbarComponent>;
  let component: ToolbarComponent;
  let store: MockStore<ToolbarState>;
  const initialState = {
    search: '',
    sort: 'name',
    order: 'asc',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideMockStore({ initialState })],
      declarations: [ToolbarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('updateOrderValue should dispatch updateOrder action', () => {
    component.updateOrderValue('1');
    expect(store.dispatch).toHaveBeenCalledWith(updateOrder({ value: '1' }));
  });

  it('updateSearchValue should dispatch updateSearch action', () => {
    component.updateSearchValue('1');
    expect(store.dispatch).toHaveBeenCalledWith(updateSearch({ value: '1' }));
  });

  it('updateSortValue should dispatch updateSort action', () => {
    component.updateSortValue('1');
    expect(store.dispatch).toHaveBeenCalledWith(updateSort({ value: '1' }));
  });
});
