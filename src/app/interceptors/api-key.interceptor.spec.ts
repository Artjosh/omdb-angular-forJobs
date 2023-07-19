import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from './api-key.interceptor';
import { environment } from '../../environments/environment';

describe('ApiKeyInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiKeyInterceptor,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add API key to the request params', () => {
    const testUrl = '/api/test';

    http.get(testUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(req => req.url === testUrl);
    expect(httpRequest.request.params.has('apikey')).toEqual(true);
    expect(httpRequest.request.params.get('apikey')).toEqual(
      environment.API_KEY
    );

    httpRequest.flush({});
  });

  it('should not add API key to the request if it already has one', () => {
    const testUrl = '/api/test';
    const req = http.get(testUrl, {
      params: { apikey: environment.API_KEY },
    });

    req.subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(req => req.url === testUrl);
    expect(httpRequest.request.params.has('apikey')).toEqual(true);
    expect(httpRequest.request.params.get('apikey')).toEqual(
      environment.API_KEY
    );

    httpRequest.flush({});
  });
});
