import { Component } from '@angular/core';

@Component({
  selector: 'textarea-stub',
  template: ` <textarea class="task-item" autofocus resize hover></textarea> `,
})
export class TextareaStubComponent {}

@Component({
  selector: 'app-toolbar',
  template: ` <div dropzone></div> `,
})
export class ToolbarStubComponent {}
