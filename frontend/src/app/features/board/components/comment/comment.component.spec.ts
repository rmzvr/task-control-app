import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsState } from '@core/models/comments.models';
import { deleteComment, updateComment } from '@core/states/comments';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let store: MockStore<CommentsState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;

    component.user = {
      _id: 'string',
      username: 'string',
      password: 'string',
      created_date: 'string',
    };

    component.comment = {
      name: '',
      taskID: 'string',
      boardID: 'string',
    };

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('editComment form should be hidden', () => {
    expect(component.isEditCommentFormOpen).toBeFalse();
  });

  it('should open editComment form', () => {
    component.toggleEditCommentForm();
    expect(component.isEditCommentFormOpen).toBeTrue();
  });

  it('should close editComment form', () => {
    component.toggleEditCommentForm();
    component.toggleEditCommentForm();
    expect(component.isEditCommentFormOpen).toBeFalse();
  });

  it('updateComment should dispatch updateComment action', () => {
    const comment = {
      name: '',
      taskID: 'string',
      boardID: 'string',
    };

    component.updateComment(comment.name);
    expect(store.dispatch).toHaveBeenCalledWith(updateComment({ comment }));
  });

  it('deleteComment should dispatch deleteComment action', () => {
    const comment = {
      name: '',
      taskID: 'string',
      boardID: 'string',
    };

    component.deleteComment();
    expect(store.dispatch).toHaveBeenCalledWith(deleteComment({ comment }));
  });
});
