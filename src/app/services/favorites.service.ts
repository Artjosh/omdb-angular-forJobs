import { Injectable } from '@angular/core';
import { OmdbMovieType } from '../app.types';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: OmdbMovieType[] = [];

  constructor() {}

  getFavorites(): OmdbMovieType[] {
    return this.favorites;
  }

  addFavorite(movie: OmdbMovieType): void {
    this.favorites.push(movie);
  }

  removeFavorite(movie: OmdbMovieType): void {
    const index = this.favorites.findIndex(fav => fav.imdbID === movie.imdbID);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  isFavorite(movie: OmdbMovieType): boolean {
    return this.favorites.some(fav => fav.imdbID === movie.imdbID);
  }
}
