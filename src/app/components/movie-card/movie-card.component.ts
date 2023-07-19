import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OmdbMovieType } from '../../app.types';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-movie-card',
  template: `
    <app-card
      *transloco="let t"
      [subtitle]="getSubtitle()"
      class="pointer"
      (click)="clickCard.emit()">
      <img
        mat-card-image
        appImageNonPoster
        [placeholder]="movieType"
        [src]="movie.Poster"
        [alt]="t('img-alt', { title: movie.Title })" />
    </app-card>
  `,
  styles: ['.pointer {cursor: pointer !important;}'],
})
export class MovieCardComponent {
  private capitalize = new CapitalizePipe();
  @Input() movie!: OmdbMovieType;
  @Output() clickCard = new EventEmitter<void>();

  get movieType(): string {
    return this.capitalize.transform(this.movie.Type);
  }

  public getSubtitle() {
    return `"${this.movie.Title}" (${this.movie.Year}) - ${this.movieType}`;
  }
}
