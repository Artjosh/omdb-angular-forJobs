import { RecentlyViewedService } from './recently-viewed.service';
import { environment } from '../../environments/environment';

describe('RecentlyViewedService', () => {
  let service: RecentlyViewedService;

  beforeEach(() => {
    service = new RecentlyViewedService();
  });

  afterEach(() => {
    localStorage.removeItem(environment.RECENTLY_VIEWED_LOCALSTORAGE_KEY_NAME);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add', () => {
    it('should add a movie to the recently viewed list', () => {
      const movieId = 'tt1234567';
      service.add(movieId);

      const recentlyViewed = service.getRecentlyViewed();
      expect(recentlyViewed.length).toBe(1);
      expect(recentlyViewed[0]).toBe(movieId);
    });

    it('should not add a movie that already exists in the list', () => {
      const movieId = 'tt1234567';
      const anotherMovieId = 'tt7654321';
      const recentlyViewed = [movieId, anotherMovieId];
      localStorage.setItem(
        environment.RECENTLY_VIEWED_LOCALSTORAGE_KEY_NAME,
        JSON.stringify(recentlyViewed)
      );

      service.add(movieId);

      const updatedRecentlyViewed = service.getRecentlyViewed();
      expect(updatedRecentlyViewed.length).toBe(2);
      expect(updatedRecentlyViewed[0]).toBe(movieId);
      expect(updatedRecentlyViewed[1]).toBe(anotherMovieId);
    });

    it('should remove the oldest movie if the list exceeds the maximum size', () => {
      const movieIds = [
        'tt1111111',
        'tt2222222',
        'tt3333333',
        'tt4444444',
        'tt5555555',
        'tt6666666',
        'tt7777777',
        'tt8888888',
        'tt9999999',
        'tt0000000',
      ];
      localStorage.setItem(
        environment.RECENTLY_VIEWED_LOCALSTORAGE_KEY_NAME,
        JSON.stringify(movieIds)
      );

      service.add('ttabcdefg');

      const updatedRecentlyViewed = service.getRecentlyViewed();
      expect(updatedRecentlyViewed.length).toBe(
        environment.MAX_RECENTLY_VIEWED
      );
      expect(updatedRecentlyViewed[0]).toBe('ttabcdefg');
      expect(updatedRecentlyViewed[9]).toBe('tt9999999');
    });
  });

  describe('getRecentlyViewed', () => {
    it('should return an empty array if no movies have been recently viewed', () => {
      const recentlyViewed = service.getRecentlyViewed();
      expect(recentlyViewed.length).toBe(0);
    });

    it('should return the recently viewed list if movies have been recently viewed', () => {
      const movieIds = ['tt1234567', 'tt7654321'];
      localStorage.setItem(
        environment.RECENTLY_VIEWED_LOCALSTORAGE_KEY_NAME,
        JSON.stringify(movieIds)
      );

      const recentlyViewed = service.getRecentlyViewed();
      expect(recentlyViewed.length).toBe(2);
      expect(recentlyViewed[0]).toBe('tt1234567');
      expect(recentlyViewed[1]).toBe('tt7654321');
    });
  });
});
