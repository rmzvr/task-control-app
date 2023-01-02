export interface EditTaskMenuPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ModalsState {
  title: string;
  isTaskMenuOpen: boolean;
  isAddBoardModalOpen: boolean;
  isEditBoardModalOpen: boolean;
  isModalOpen: boolean;
  editTaskMenuPosition: EditTaskMenuPosition;
  isTaskModalOpen: boolean;
}
