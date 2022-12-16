import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SearchPipe } from './pipes/search/search.pipe';
import { SortPipe } from './pipes/sort/sort.pipe';
import { ButtonMoreComponent } from './components/button-more/button-more.component';
import { HoverDirective } from './directives/hover/hover.directive';
import { ColorSelectComponent } from './components/color-select/color-select.component';
import { ResizeDirective } from './directives/resize/resize.directive';
import { DraggableDirective } from './directives/draggable/draggable.directive';
import { DraggableHelperDirective } from './directives/draggable-helper/draggable-helper.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { DropzoneDirective } from './directives/dropzone/dropzone.directive';
import { DroppableDirective } from './directives/droppable/droppable.directive';
import { DroppableService } from './directives/droppable/droppable.service';
import { SortTasksPipe } from './pipes/sortTasks/sort-tasks.pipe';
import { SortCommentsPipe } from './pipes/sortComments/sort-comments.pipe';
import { AddBoardModalComponent } from './components/add-board-modal/add-board-modal.component';
import { EditBoardModalComponent } from './components/edit-board-modal/edit-board-modal.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { AutofocusDirective } from './directives/autofocus/autofocus.directive';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

@NgModule({
  declarations: [
    DraggableHelperDirective,
    DraggableDirective,
    DroppableDirective,
    DropzoneDirective,
    ResizeDirective,
    HoverDirective,

    SearchPipe,
    SortPipe,

    ToolbarComponent,

    ColorSelectComponent,

    ButtonMoreComponent,
    SortTasksPipe,
    SortCommentsPipe,
    AddBoardModalComponent,
    EditBoardModalComponent,
    ContextMenuComponent,
    AutofocusDirective,
    SkeletonComponent,
  ],
  imports: [CommonModule, FormsModule, OverlayModule, ReactiveFormsModule],
  exports: [
    DraggableHelperDirective,
    DraggableDirective,
    DroppableDirective,
    DropzoneDirective,
    ResizeDirective,
    HoverDirective,

    SearchPipe,
    SortPipe,

    ToolbarComponent,

    ColorSelectComponent,

    ButtonMoreComponent,

    OverlayModule,
    SortTasksPipe,
    SortCommentsPipe,
    AddBoardModalComponent,
    EditBoardModalComponent,
    ContextMenuComponent,
    AutofocusDirective,
    SkeletonComponent,
  ],
  providers: [DroppableService],
})
export class SharedModule {}
