// imdbConfig.ts
export const IMDB_CONFIG = {
    BASE_URL: "https://imdb236.p.rapidapi.com",
    API_KEY: process.env.EXPO_PUBLIC_IMDB_API_KEY,
    headers: {
        accept: "application/json",
        "x-rapidapi-key": process.env.EXPO_PUBLIC_IMDB_API_KEY as string,
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
    },
};

// fetchMovies.ts
export const fetchMovies = async ({ query }: { query: string }) => {
    const endPoint = query
        ? `${IMDB_CONFIG.BASE_URL}/imdb/autocomplete?query=${encodeURIComponent(query)}`
        : `${IMDB_CONFIG.BASE_URL}/imdb/most-popular-movies`;

    const response = await fetch(endPoint, {
        method: "GET",
        headers: IMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("Movies Data:", data);
    return data.slice(0, 15);
};

export const fetchMoviesDetails = async (movieId: String): Promise<MovieDetails> => {
    try {
        const endPoint = `${IMDB_CONFIG.BASE_URL}/imdb/${movieId}`;
        const response = await fetch(endPoint, {
            method: "GET",
            headers: IMDB_CONFIG.headers,
        });
    if (!response.ok) {
        throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
} catch (error) {
    console.log(error);
    throw error;
}};
// const response = await fetch(`${IMDB_CONFIG.BASE_URL}/imdb/${movieId}}?`);
