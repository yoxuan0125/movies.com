import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	movies: [],
	nextPageNumber: 1,
};

const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		addMovies: (state, { payload }) => {
			state.movies = [...state.movies, ...payload];
		},
		changePage: (state) => {
			state.nextPageNumber += 1;
		},
		clearList: (state) => {
			state.movies = [];
			state.nextPageNumber = 1;
		},
	},
});

export const { addMovies, clearList, changePage } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getNextPage = (state) => state.movies.nextPageNumber;
export default movieSlice.reducer;
