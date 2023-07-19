import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <mat-card [style.width.px]="width" class="card" [class]="class">
      <mat-card-header>
        <mat-card-title *ngIf="title">{{ title }}</mat-card-title>
        <mat-card-subtitle *ngIf="subtitle">{{ subtitle }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="displayNoneWhenEmpty">
        <ng-content select="[content]"></ng-content>
      </mat-card-content>
      <mat-card-actions class="displayNoneWhenEmpty">
        <ng-content select="[actions]"></ng-content>
      </mat-card-actions>
      <mat-card-footer class="displayNoneWhenEmpty">
        <ng-content select="[footer]"></ng-content>
      </mat-card-footer>
      <ng-content></ng-content>
    </mat-card>
  `,
  styles: [
    '.displayNoneWhenEmpty:empty{display:none;}',
    '.card{background-color: #fafafa}',
  ],
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() width?: number;
  @Input() class = '';
}
