import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OmdbMovieType } from '../../app.types';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { MovieCardComponent } from './movie-card.component';
import { CardComponent } from '../card/card.component';
import { TranslocoService, TranslocoTestingModule } from '@ngneat/transloco';
import { MatCardModule } from '@angular/material/card';
import { OmdbApiService } from '../../services/omdb-api.service';
import { ImageNonPosterDirective } from '../../directives/image-non-poster.directive';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  const movie: OmdbMovieType = {
    imdbID: '123',
    Title: 'The Matrix',
    Year: '1999',
    Type: 'movie',
    Poster: 'https://example.com/poster.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CapitalizePipe,
        CardComponent,
        MovieCardComponent,
        ImageNonPosterDirective,
      ],
      imports: [TranslocoTestingModule, MatCardModule],
      providers: [OmdbApiService, TranslocoService],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the movie poster', () => {
    const image = fixture.nativeElement.querySelector('img');
    expect(image.getAttribute('src')).toEqual(movie.Poster);
    expect(image.getAttribute('alt')).toContain('en.img-alt');
  });

  it('should emit click event when card is clicked', () => {
    spyOn(component.clickCard, 'emit');
    const card = fixture.nativeElement.querySelector('.pointer');
    card.click();
    expect(component.clickCard.emit).toHaveBeenCalled();
  });
});
