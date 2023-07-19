import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LangSelectComponent } from './lang-select.component';
import { TranslocoService, TranslocoTestingModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../environments/environment';

describe('LangSelectComponent', () => {
  let component: LangSelectComponent;
  let fixture: ComponentFixture<LangSelectComponent>;
  let translocoService: TranslocoService;

  beforeEach(async () => {
    translocoService = jasmine.createSpyObj('TranslocoService', [
      'langChanges$',
      'setActiveLang',
    ]);

    await TestBed.configureTestingModule({
      declarations: [LangSelectComponent],
      imports: [
        TranslocoTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
      providers: [TranslocoService],
    }).compileComponents();

    fixture = TestBed.createComponent(LangSelectComponent);

    translocoService = TestBed.inject(TranslocoService);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should setActiveLang call corectly', () => {
    const expectedLang = 'pt';

    const spy = spyOn(translocoService, 'setActiveLang');

    component.setLanguage(expectedLang);

    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.argsFor(0).at(0)).toBe(expectedLang);
  });

  it('should set the current language', () => {
    const expectedLang = 'pt';
    const spy = spyOn(localStorage, 'setItem');

    component.setLanguage(expectedLang);

    expect(spy.calls.argsFor(0).at(0)).toBe(
      environment.LANGUAGE_LOCALSTORAGE_KEY_NAME
    );
    expect(spy.calls.argsFor(0).at(1)).toBe(expectedLang);
  });
});
