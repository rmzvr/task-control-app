import { ModalsState } from './modals.models';

export const initialState: ModalsState = {
  title: '',
  isTaskMenuOpen: false,
  isModalOpen: false,
  isAddBoardModalOpen: false,
  isEditBoardModalOpen: false,
  isTaskModalOpen: false,
  editTaskMenuPosition: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
};
