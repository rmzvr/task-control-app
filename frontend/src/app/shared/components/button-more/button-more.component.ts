import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-more',
  templateUrl: './button-more.component.html',
  styleUrls: ['./button-more.component.scss'],
})
export class ButtonMoreComponent {
  @Input() isButtonLight: boolean = true;
  @Output() clickEmitter: EventEmitter<Event> = new EventEmitter();

  public setButtonTheme(): string {
    return this.isButtonLight
      ? `button-more button-more--theme--light`
      : `button-more button-more--theme--dark`;
  }
}
