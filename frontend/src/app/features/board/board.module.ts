import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { SharedModule } from '@shared/shared.module';

import { ListComponent } from './components/list/list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskMenuComponent } from './components/task-menu/task-menu.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentFormComponent } from './components/add-comment-form/add-comment-form.component';
import { DescriptionSectionComponent } from './components/description-section/description-section.component';
import { CoreModule } from '@core/core.module';
import { BoardRoutingModule } from './board-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@features/login/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    BoardComponent,
    ListComponent,
    TaskModalComponent,
    TaskItemComponent,
    TaskMenuComponent,
    CommentComponent,
    AddCommentFormComponent,
    DescriptionSectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
    BoardRoutingModule,
  ],
  exports: [BoardComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class BoardModule {}
