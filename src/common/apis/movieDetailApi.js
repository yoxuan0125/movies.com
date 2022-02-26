import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMovieDetails, setmovieActors } from "../../Redux/movies/movieSlice";

export default function useMovieDetailsSearch(movie_id) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const dispatch = useDispatch();
	const APIKey = "55d94f60e799bfe097c0411107134875";

	useEffect(() => {
		setLoading(true);
		setError(false);

		const url1 = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${APIKey}&language=zh-TW`;
		const url2 = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${APIKey}&language=zh-TW`;

		let endpoints = [url1, url2];

		axios
			.all(endpoints.map((endpoint) => axios.get(endpoint)))
			.then((data) => {
				setLoading(false);
				dispatch(setMovieDetails(data[0].data));
				dispatch(setmovieActors(data[1].data));
			})
			.catch((e) => {
				console.log(e);
			});
	}, [movie_id, dispatch]);

	return { loading, error };
}
