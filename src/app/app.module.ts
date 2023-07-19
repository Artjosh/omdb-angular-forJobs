import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslocoHttpLoader } from './services/transloco-http-loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchToolbarComponent } from './components/search-toolbar/search-toolbar.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from './components/card/card.component';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { StringToNumberPipe } from './pipes/string-to-number.pipe';
import { MatPaginatorIntlCroService } from './services/mat-paginator-intl-cro.service';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ImageNonPosterDirective } from './directives/image-non-poster.directive';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { InfoLabelComponent } from './components/info-label/info-label.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LangSelectComponent } from './components/lang-select/lang-select.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchToolbarComponent,
    CapitalizePipe,
    CardComponent,
    StringToNumberPipe,
    MovieCardComponent,
    ImageNonPosterDirective,
    DetailsPageComponent,
    InfoLabelComponent,
    LangSelectComponent,
    FavoritesPageComponent,
    FavoritesListComponent,
    StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslocoModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSidenavModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'pt'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCroService },
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
