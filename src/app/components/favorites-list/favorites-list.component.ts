import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { OmdbMovieType } from '../../app.types';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../app.routes';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  movies: OmdbMovieType[] = [];

  constructor(private favoritesService: FavoritesService, private router: Router) { }

  ngOnInit() {
    this.movies = this.favoritesService.getFavorites();
  }

    goToHomePage() {
    this.router.navigate([APP_ROUTES.HOME_PAGE]);
  }

  goToMovieDetails(imdbID: string): void {
    this.router.navigate([APP_ROUTES.DETAILS_PAGE, imdbID]);
  }

  toggleFavorite(movie: OmdbMovieType) {
    if (this.isFavorite(movie)) {
      this.favoritesService.removeFavorite(movie);
    } else {
      this.favoritesService.addFavorite(movie);
    }
  }
  isFavorite(movie: OmdbMovieType): boolean {
    return this.favoritesService.getFavorites().some((fav) => fav.imdbID === movie.imdbID);
  }
}
