import { createReducer, on } from '@ngrx/store';
import {
  toggleAddBoardModal,
  toggleModal,
  toggleTaskMenu,
  toggleTaskModal,
  toggleUpdateBoardModal,
  updateModalTitle,
  updateTaskMenuPosition,
} from './modals.actions';
import { initialState } from './modals.state';

export const modalsReducer = createReducer(
  initialState,
  on(toggleModal, (state) => ({
    ...state,
    isModalOpen: !state.isModalOpen,
  })),
  on(updateModalTitle, (state, { title }) => ({
    ...state,
    title,
  })),
  on(toggleTaskModal, (state) => ({
    ...state,
    isTaskModalOpen: !state.isTaskModalOpen,
  })),
  on(toggleTaskMenu, (state) => ({
    ...state,
    isTaskMenuOpen: !state.isTaskMenuOpen,
  })),
  on(toggleAddBoardModal, (state) => ({
    ...state,
    isAddBoardModalOpen: !state.isAddBoardModalOpen,
  })),
  on(toggleUpdateBoardModal, (state) => ({
    ...state,
    isEditBoardModalOpen: !state.isEditBoardModalOpen,
  })),

  on(updateTaskMenuPosition, (state, { x, y, width, height }) => ({
    ...state,
    editTaskMenuPosition: { x, y, width, height },
  }))
);
