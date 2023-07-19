import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { OmdbSearchResponseType, SearchParametersType } from '../../app.types';
import { OmdbApiService } from '../../services/omdb-api.service';
import { HomePageComponent } from './home-page.component';
import { environment } from '../../../environments/environment';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let omdbApiService: jasmine.SpyObj<OmdbApiService>;

  const dummyData: OmdbSearchResponseType = {
    Response: 'True',
    Search: [
      {
        imdbID: 'id',
        Title: 'title',
        Type: 'movie',
        Year: '2023',
        Poster: 'N/A',
      },
      {
        imdbID: 'id',
        Title: 'title',
        Type: 'movie',
        Year: '2023',
        Poster: 'N/A',
      },
    ],
    totalResults: '2',
  };

  const dummyDefaultSearchData: SearchParametersType = {
    searchedText: environment.START_SEARCH_TEXT_VALUE,
    year: null,
    type: '',
    page: 0,
  };

  const dummySearchData: SearchParametersType = {
    searchedText: 'Kapitan Bomba',
    year: 2006,
    type: 'movie',
    page: 25,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatPaginatorModule,
        ReactiveFormsModule,
      ],
      declarations: [HomePageComponent],
      providers: [
        {
          provide: OmdbApiService,
          useValue: jasmine.createSpyObj<OmdbApiService>(['getMovies']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;

    omdbApiService = TestBed.inject(
      OmdbApiService
    ) as jasmine.SpyObj<OmdbApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('searchForm', () => {
    it('should initialize with default values', () => {
      expect(component.searchForm.value).toEqual(dummyDefaultSearchData);
    });

    it('should update page value when handleChangePage is called', () => {
      const pageIndex = 1;
      component.handleChangePage({ pageIndex } as any);

      expect(component.searchForm.value.page).toBe(pageIndex);
    });
  });

  describe('omdbData$', () => {
    it('should call omdbApiService.getMovies with correct params', () => {
      omdbApiService.getMovies.and.returnValue(of(dummyData));
      component.searchForm.setValue(dummySearchData);

      component.searchForm.valueChanges.subscribe(() => {
        expect(omdbApiService.getMovies).toHaveBeenCalledWith(dummySearchData);
      });
    });

    it('should update omdbData$ when searchForm value changes', () => {
      omdbApiService.getMovies.and.returnValue(of(dummyData));
      component.searchForm.patchValue({ searchedText: 'new search' });

      component.omdbData$.subscribe(data => {
        expect(data).toEqual(dummyData);
      });
    });
  });
});
