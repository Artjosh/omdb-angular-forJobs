import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchFormType, SearchParametersType } from '../../app.types';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../app.routes';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss']
})
export class SearchToolbarComponent {
  @Output() search = new EventEmitter<SearchParametersType>();

  @Input() searchForm!: FormGroup<SearchFormType>;

  public typeOptions = [
    {
      key: 'movie',
      translationKey: 'home-page.search-form.fields.type.options.movie'
    },
    {
      key: 'series',
      translationKey: 'home-page.search-form.fields.type.options.series'
    },
    {
      key: 'episode',
      translationKey: 'home-page.search-form.fields.type.options.episode'
    },
    {
      key: 'game',
      translationKey: 'home-page.search-form.fields.type.options.game'
    }
  ];

  constructor(private router: Router) {}

  onChange() {
    this.searchForm.controls.page.setValue(0);
  }

  goToFavoritesPage() {
    this.router.navigate([APP_ROUTES.FAVORITES_PAGE]);
  }
}
