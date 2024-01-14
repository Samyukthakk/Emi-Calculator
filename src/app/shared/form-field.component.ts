import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-field',
  template: `
    <div class="form-field-container">
      <label>{{ label }}</label>
      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      label {
        font-size: 16px;
        width: 110px;
      }

      .form-field-container {
        width: 100%;
        align-items: center;
        padding: 10px;
      }

      .content {
        margin-top: 10px;
        align-content: center;
        text-align: justify;
      }
    `,
  ],
})
export default class FormFieldComponent {
  @Input('label-text')
  label: string | undefined;
}
