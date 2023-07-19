import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-label',
  template: `
    <div>
      <span class="fw-bold">{{ label | capitalize }}</span
      >: {{ value }}
    </div>
  `,
  styles: [],
})
export class InfoLabelComponent {
  @Input() label!: string;
  @Input() value!: string;
}
