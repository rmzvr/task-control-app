import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-select',
  templateUrl: './color-select.component.html',
  styleUrls: ['./color-select.component.scss'],
})
export class ColorSelectComponent {
  public colors = [
    { name: 'blue', code: '#0079bf' },
    { name: 'caramel', code: '#d29034' },
    { name: 'fern', code: '#519839' },
    { name: 'brick', code: '#b04632' },
    { name: 'wisteria', code: '#89609e' },
    { name: 'magenta', code: '#cd5a91' },
  ];

  @Input() public size?: 'large' | 'small' = 'large';
  @Input() public currentColor?: string = this.colors[0].code;
  @Output() public clickEmitter: EventEmitter<string> = new EventEmitter();

  public setColor(color: string) {
    this.currentColor = color;
    this.clickEmitter.emit(color);
  }

  public getClass(): string {
    return `colors ${this.size}`;
  }
}
