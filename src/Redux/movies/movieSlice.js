import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	TOP10Movies: [],
	movies: [],
	TVShows: [],
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
		clearList: (state) => {
			state.movies = [];
			state.TVShows = [];
			state.nextPageNumber = 1;
		},
	},
});

export const { addMovies, clearList, changePage, addTVShows } =
	movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllTVShows = (state) => state.movies.TVShows;
export const getNextPage = (state) => state.movies.nextPageNumber;
export default movieSlice.reducer;
