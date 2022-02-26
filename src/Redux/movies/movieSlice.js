import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	TOP10Movies: [],
	movies: [],
	TVShows: [],
	movieDetails: [],
	movieActors: [],
	nextPageNumber: 1,
};

const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		addMovies: (state, { payload }) => {
			state.movies = [...state.movies, ...payload];
		},
		addTVShows: (state, { payload }) => {
			state.TVShows = [...state.TVShows, ...payload];
		},
		changePage: (state) => {
			state.nextPageNumber += 1;
		},
		setMovieDetails: (state, { payload }) => {
			state.movieDetails = payload;
		},
		setmovieActors: (state, { payload }) => {
			state.movieActors = payload;
		},
		clearList: (state) => {
			state.movies = [];
			state.TVShows = [];
			state.nextPageNumber = 1;
		},
	},
});

export const {
	addMovies,
	clearList,
	changePage,
	addTVShows,
	setMovieDetails,
	setmovieActors,
} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllTVShows = (state) => state.movies.TVShows;
export const getNextPage = (state) => state.movies.nextPageNumber;
export const getMovieDetails = (state) => state.movies.movieDetails;
export default movieSlice.reducer;
