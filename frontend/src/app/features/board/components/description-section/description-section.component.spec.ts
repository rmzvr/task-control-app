import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksState } from '@core/models/tasks.models';
import { setCurrentTask, updateTask } from '@core/states/tasks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DescriptionSectionComponent } from './description-section.component';

describe('DescriptionSectionComponent', () => {
  let component: DescriptionSectionComponent;
  let fixture: ComponentFixture<DescriptionSectionComponent>;
  let store: MockStore<TasksState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionSectionComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(DescriptionSectionComponent);
    component = fixture.componentInstance;
    component.task = {
      _id: 'string',
      name: 'string',
      listID: 'string',
      boardID: 'string',
      description: 'string',
      created_date: 'string',
    };
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('descriptionForm form should be hidden', () => {
    expect(component.isDescriptionFormOpen).toBeFalse();
  });

  it('should open editComment form', () => {
    component.toggleDescriptionForm();
    expect(component.isDescriptionFormOpen).toBeTrue();
  });

  it('should close editComment form', () => {
    component.toggleDescriptionForm();
    component.toggleDescriptionForm();
    expect(component.isDescriptionFormOpen).toBeFalse();
  });

  it('updateDescription should dispatch updateTask action', () => {
    component.updateDescription('string');
    expect(store.dispatch).toHaveBeenCalledWith(
      updateTask({ task: component.task })
    );
  });

  it('setCurrentTask should dispatch setCurrentTask action', () => {
    component.setCurrentTask('string');
    expect(store.dispatch).toHaveBeenCalledWith(
      setCurrentTask({ task: component.task })
    );
  });
});
