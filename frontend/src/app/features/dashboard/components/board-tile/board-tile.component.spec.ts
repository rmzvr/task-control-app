import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTileComponent } from './board-tile.component';

describe('BoardTileComponent', () => {
  let component: BoardTileComponent;
  let fixture: ComponentFixture<BoardTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
