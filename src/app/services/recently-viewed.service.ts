import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecentlyViewedService {
  add(movieId: string): void {
    const recentlyViewed = this.getRecentlyViewed();
    const index = recentlyViewed.indexOf(movieId);

    if (index !== -1) {
      recentlyViewed.splice(index, 1);
    }

    recentlyViewed.unshift(movieId);

    if (recentlyViewed.length > environment.MAX_RECENTLY_VIEWED) {
      recentlyViewed.pop();
    }

    localStorage.setItem(
      environment.RECENTLY_VIEWED_LOCALSTORAGE_KEY_NAME,
      JSON.stringify(recentlyViewed)
    );
  }

  getRecentlyViewed(): string[] {
    const recentlyViewed = localStorage.getItem(
      environment.RECENTLY_VIEWED_LOCALSTORAGE_KEY_NAME
    );

    if (recentlyViewed) {
      return JSON.parse(recentlyViewed);
    }

    return [];
  }
}
