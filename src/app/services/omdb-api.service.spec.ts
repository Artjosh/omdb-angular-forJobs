import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OmdbApiService } from './omdb-api.service';
import {
  OmdbMovieDetailsType,
  OmdbSearchResponseType,
  SearchParametersType,
} from '../app.types';
import { environment } from '../../environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoService, TranslocoTestingModule } from '@ngneat/transloco';

describe('OmdbApiService', () => {
  let injector: TestBed;
  let service: OmdbApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        TranslocoTestingModule,
      ],
      providers: [OmdbApiService, TranslocoService, MatSnackBar],
    });
    injector = getTestBed();
    service = injector.inject(OmdbApiService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getMovies', () => {
    it('should return an Observable<OmdbSearchResponseType>', () => {
      const dummyPayload: SearchParametersType = {
        searchedText: 'star wars',
        year: 1977,
        type: 'movie',
        page: 0,
      };

      const expectedUr = `${
        environment.API_URL
      }?s=${dummyPayload.searchedText.replace(' ', '%20')}&y=${
        dummyPayload.year
      }&type=${dummyPayload.type}&page=${dummyPayload.page + 1}`;

      const dummyResponse: OmdbSearchResponseType = {
        Search: [],
        totalResults: '0',
        Response: 'True',
      };

      service.getMovies(dummyPayload).subscribe(res => {
        expect(res).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(request =>
        request.url.includes(environment.API_URL)
      );

      expect(req.request.urlWithParams).toBe(expectedUr);
      expect(req.request.method).toBe('GET');

      req.flush(dummyResponse);
    });
  });

  describe('#getMovie', () => {
    it('should return an Observable<OmdbMovieDetailsType>', () => {
      const dummyResponse: OmdbMovieDetailsType = {
        Title: 'The Matrix',
        Year: '1999',
        Rated: 'R',
        Released: '31 Mar 1999',
        Runtime: '136 min',
        Genre: 'Action, Sci-Fi',
        Director: 'Lana Wachowski, Lilly Wachowski',
        Writer: 'Lilly Wachowski, Lana Wachowski',
        Actors:
          'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
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

      service.getMovieByImdbID(dummyResponse.imdbID).subscribe(res => {
        expect(res).toEqual(dummyResponse);
      });

      const expectedUr = `${environment.API_URL}?i=${dummyResponse.imdbID}&plot=full`;

      const req = httpMock.expectOne(request =>
        request.url.includes(environment.API_URL)
      );

      expect(req.request.urlWithParams).toBe(expectedUr);
      expect(req.request.method).toBe('GET');

      req.flush(dummyResponse);
    });
  });
});
