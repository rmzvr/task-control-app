import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Comment, CommentsState } from '@core/models/comments.models';
import { addComment } from '@core/states/comments';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AddCommentFormComponent } from './add-comment-form.component';

describe('AddCommentFormComponent', () => {
  let component: AddCommentFormComponent;
  let fixture: ComponentFixture<AddCommentFormComponent>;
  let store: MockStore<CommentsState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCommentFormComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AddCommentFormComponent);
    component = fixture.componentInstance;
    component.task = {
      _id: 'string',
      name: 'string',
      boardID: 'string',
      listID: 'string',
    };
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('addComment form should be hidden', () => {
    expect(component.isAddCommentFormOpen).toBeFalse();
  });

  it('should open addComment form', () => {
    component.toggleAddCommentForm();
    expect(component.isAddCommentFormOpen).toBeTrue();
  });

  it('should close addComment form', () => {
    component.toggleAddCommentForm();
    component.toggleAddCommentForm();
    expect(component.isAddCommentFormOpen).toBeFalse();
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

  it('should clean comment value', () => {
    component.commentValue = 'fadsgasd';
    component.cleanCommentValue();
    expect(component.commentValue).toBe('');
  });

  it('addComment should dispatch addComment action', () => {
    const comment = {
      name: '',
      taskID: 'string',
      boardID: 'string',
    };

    component.addComment();
    expect(store.dispatch).toHaveBeenCalledWith(addComment({ comment }));
  });
});
