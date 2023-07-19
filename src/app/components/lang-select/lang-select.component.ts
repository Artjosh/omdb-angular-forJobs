import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

@Component({
  selector: 'app-lang-select',
  template: ` <mat-form-field
    appearance="outline"
    class="w-100"
    *ngIf="currentLang$ | async as currentLang">
    <mat-label *transloco="let t">{{ t('language') | capitalize }}</mat-label>
    <mat-select
      [value]="currentLang"
      (selectionChange)="setLanguage($event.value)">
      <mat-option *ngFor="let lang of availableLangs" [value]="lang">{{
        lang | uppercase
      }}</mat-option>
    </mat-select>
  </mat-form-field>`,
})
export class LangSelectComponent {
  currentLang$ = this.translocoService.langChanges$.pipe(
    map(lang => {
      const activeLang = localStorage.getItem(
        environment.LANGUAGE_LOCALSTORAGE_KEY_NAME
      );

      if (activeLang && lang !== activeLang) {
        this.translocoService.setActiveLang(activeLang);
        return activeLang;
      }

      return lang;
    })
  );

  availableLangs = this.translocoService.getAvailableLangs() as string[];

  constructor(private translocoService: TranslocoService) {}

  setLanguage(lang: string) {
    localStorage.setItem(environment.LANGUAGE_LOCALSTORAGE_KEY_NAME, lang);
    this.translocoService.setActiveLang(lang);
  }
}
