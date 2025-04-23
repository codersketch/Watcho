interface MovieImdb {
    id: number;
    primaryTitle: string;
    averageRating: number;
    primaryImage: string;
    releaseDate: string;
    // type:string;
    // originalTitle: string;
    // language: string;
    // isAdult: boolean;
    // numVotes: number;
    // genre_ids: number[];
    // overview: string;
    // popularity: number;
    // video: boolean;
}
interface Movie {
  id: string;
  primaryTitle: string;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  primaryImage: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingMovie {
  searchTerm: string;
  movie_id: string;
  title: string;
  count: number;
  poster_url: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}
