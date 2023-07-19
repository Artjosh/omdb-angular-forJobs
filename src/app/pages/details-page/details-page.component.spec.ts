import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { OmdbApiService } from '../../services/omdb-api.service';
import { RecentlyViewedService } from '../../services/recently-viewed.service';
import { DetailsPageComponent } from './details-page.component';
import { OmdbMovieDetailsType } from '../../app.types';
import { APP_ROUTES } from '../../app.routes';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoService, TranslocoTestingModule } from '@ngneat/transloco';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('DetailsPageComponent', () => {
  let component: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;
  let omdbApiService: OmdbApiService;

  const dummyMovie: OmdbMovieDetailsType = {
    Title: 'The Matrix',
    Year: '1999',
    Rated: 'R',
    Released: '31 Mar 1999',
    Runtime: '136 min',
    Genre: 'Action, Sci-Fi',
    Director: 'Lana Wachowski, Lilly Wachowski',
    Writer: 'Lilly Wachowski, Lana Wachowski',
    Actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
    Plot: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    Language: 'English',
    Country: 'USA, Australia',
    Awards: 'Won 4 Oscars. Another 39 wins & 51 nominations.',
    Poster: 'https://www.example.com/poster.jpg',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '8.7/10',
      },
      {
        Source: 'Rotten Tomatoes',
        Value: '88%',
      },
      {
        Source: 'Metacritic',
        Value: '73/100',
      },
    ],
    Metascore: '73',
    imdbRating: '8.7',
    imdbVotes: '1,751,637',
    imdbID: 'tt0133093',
    Type: 'movie',
    DVD: '15 May 2007',
    BoxOffice: '$172,076,928',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        TranslocoTestingModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ imdbID: 'test-id' }) },
        },
        OmdbApiService,
        RecentlyViewedService,
        MatSnackBar,
        TranslocoService,
      ],
    }).compileComponents();

    omdbApiService = TestBed.inject(OmdbApiService);
    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct HOME_ROUTE value', () => {
    expect(component.HOME_ROUTE).toEqual(APP_ROUTES.HOME_PAGE);
  });

  it('should have movie$ observable', () => {
    spyOn(omdbApiService, 'getMovieByImdbID').and.returnValue(of(dummyMovie));
    fixture.detectChanges();

    component.movie$.subscribe(result => {
      expect(result).toEqual(dummyMovie);
    });
  });

  it('should have recentlyViewedMovies$ observable', () => {
    spyOn(omdbApiService, 'getRecentlyViewedMovies').and.returnValue(
      of([dummyMovie])
    );
    fixture.detectChanges();

    component.recentlyViewedMovies$.subscribe(result => {
      expect(result[0]).toEqual(dummyMovie);
    });
  });
});
