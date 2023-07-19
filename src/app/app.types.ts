import { FormControl } from '@angular/forms';

export type SearchParametersType = {
  searchedText: string;
  type: string;
  year: number | null;
  //It must be one less, for example 1 page is 0.
  page: number;
};

export type SearchFormType = {
  searchedText: FormControl<string>;
  type: FormControl<string>;
  year: FormControl<number | null>;
  page: FormControl<number>;
};

export type OmdbMovieType = {
  imdbID: string;
  Title: string;
  Type: string;
  Year: string;
  Poster: string;
};

export type OmdbSearchResponseType = {
  Response: string;
  Search?: OmdbMovieType[];
  totalResults?: string;
  Error?: string;
};

export type RatingType = {
  Source: string;
  Value: string;
};

export type OmdbMovieDetailsType = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: RatingType[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
};
