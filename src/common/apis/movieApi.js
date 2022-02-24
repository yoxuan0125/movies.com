import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addMovies, clearList } from "../../Redux/movies/movieSlice";

export default function useMovieSearch(pageNumber, category) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [movies, setMovies] = useState([]);
	const [hasMore, setHasMore] = useState(false);
	const dispatch = useDispatch();
	const APIKey = "55d94f60e799bfe097c0411107134875";

	useEffect(() => {
		dispatch(clearList());
	}, [category]);

	useEffect(async () => {
		setLoading(true);
		setError(false);
		let cancel;
		await axios({
			method: "GET",
			url: `
https://api.themoviedb.org/3/discover/${category}?api_key=${APIKey}&language=zh-TW&sort_by=popularity.desc&with_watch_monetization_types=flatrate`,
			params: { page: pageNumber },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setHasMore(res.data.results.length > 0);
				setLoading(false);
				dispatch(addMovies(res.data.results));
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				setError(true);
			});
		return () => cancel();
	}, [pageNumber, category]);

	return { loading, error, movies, hasMore };
}
