export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
};
export const fetchMovies = async ({ query }: { query: string }) => {
    const endPoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movies?sort_by=popularity.desc`;
    const response = await fetch(endPoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
};
/*const url =
    "https://api.themoviedb.org/3/discover/movies?include_adult=false&language=en-US&page=1";
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjRhNjM0YjljMDZlNWNiYWExYTYyZmVmNWMyOGU5ZSIsIm5iZiI6MTc0NDcxNTQxOS4xNTgwMDAyLCJzdWIiOiI2N2ZlM2U5YjlkMWY3NzhhYjg5OTY1MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.K0KmUAN79sHmt64-PAfuyTro8YOVNLlJp3P1KRslQoQ",
    },
};

fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));*/
