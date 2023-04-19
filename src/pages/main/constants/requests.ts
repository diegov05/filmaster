export const key: string = "bf0048d3c2f01f2c4e53d30b41cea183"

const requests = {
    popularMoviesRequest: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    latestMoviesRequest: `
    https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`,
    topRatedMoviesRequest: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    upcomingMoviesRequest: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    trendingMoviesRequest: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`,
    moviesGenresRequest: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`,
    seriesGenresRequest: `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=en-US`,
    popularSeriesRequest: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1&with_original_language=en`,
    trendingSeriesRequest: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=2&with_original_language=en`,
    topRatedSeriesRequest: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1&with_original_language=en`,
    onAirSeriesRequest: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&page=1&with_original_language=en|ja`,

}

export default requests
