import { Component, Input } from '@angular/core';

@Component({
  selector: 'tk-input-error',
  template: `
    <div class="error-text" *ngIf="!formField.valid && (formField.dirty || submitted)">
      <ng-content></ng-content>
    </div>
  `
})
export class InputErrorComponent {
  @Input() formField: object;
  @Input() submitted: boolean;
}