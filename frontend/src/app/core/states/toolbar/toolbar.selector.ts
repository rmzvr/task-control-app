import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ToolbarState } from './toolbar.models';

export const selectToolbar = createFeatureSelector<ToolbarState>('toolbar');

export const selectToolbarValues = createSelector(
  selectToolbar,
  (state: ToolbarState) => state
);
