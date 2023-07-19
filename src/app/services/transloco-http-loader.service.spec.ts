import { TestBed } from '@angular/core/testing';
import { TranslocoHttpLoader } from './transloco-http-loader.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TranslocoHttpLoader', () => {
  let loader: TranslocoHttpLoader;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslocoHttpLoader],
    });

    loader = TestBed.inject(TranslocoHttpLoader);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(loader).toBeTruthy();
  });

  it('should get translations for given language', () => {
    const lang = 'en';
    const mockTranslation = { greeting: 'Hello' };

    loader.getTranslation(lang).subscribe(translation => {
      expect(translation).toEqual(mockTranslation);
    });

    const req = httpMock.expectOne(`/assets/i18n/${lang}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTranslation);
  });
});
