import React, { useEffect, useState } from "react";
import useMovieDetailsSearch from "../../common/apis/movieDetailApi";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	getMovieDetails,
	getMovieActors,
	getMovieTrailer,
	getwatchList,
	setwatchList,
} from "../../Redux/movies/movieSlice";
import "./MovieDetails.css";

import { doc, setDoc } from "@firebase/firestore";
import { db, auth } from "../../firebase";

import MovieCard from "../MovieCard/MovieCard";

const MovieDetails = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const movieDetails = useSelector(getMovieDetails);
	const movieActors = useSelector(getMovieActors);
	const movieTrailer = useSelector(getMovieTrailer);
	const userInfo = auth.currentUser;
	const [isFound, setIsFound] = useState(false);
	const [isUserSignedIn, setIsUserSignedIn] = useState(false);
	const movieWatchList = useSelector(getwatchList);
	const path = window.location.pathname;

	//check if login
	auth.onAuthStateChanged((user) => {
		if (user) {
			return setIsUserSignedIn(true);
		}
		setIsUserSignedIn(false);
	});

	//get movie details
	useMovieDetailsSearch(dispatch, params.id, params.category);

	//add to watchList/remove from watch list function
	const addToWatchList = () => {
		if (isUserSignedIn && movieWatchList) {
			const newWatchList = [
				...movieWatchList.data,
				{
					id: params.id,
					path: path,
					title: movieDetails.title || movieDetails.name,
					original_title: movieDetails.original_title || movieDetails.original_name,
					poster_path: `${movieDetails.poster_path}`,
				},
			];
			setDoc(doc(db, "watchlist", userInfo.uid), {
				data: [...newWatchList],
			});
			dispatch(setwatchList({ data: [...newWatchList] }));
			setIsFound(true);
		} else {
			alert("Please log in");
		}
	};

	const removeFromWatchList = () => {
		const newWatchList = movieWatchList.data.filter(
			(movie) => movie.id !== params.id
		);
		setDoc(doc(db, "watchlist", userInfo.uid), {
			data: [...newWatchList],
		});
		dispatch(setwatchList({ data: [...newWatchList] }));
		setIsFound(false);
	};

	//check if the movie is in the watchlist
	useEffect(() => {
		if (movieWatchList.length !== 0) {
			movieWatchList.data?.some((element) => {
				if (element.id === params.id) {
					setIsFound(true);
				}
			});
		}
	}, [movieWatchList, params.id]);

	if (Object.keys(movieDetails).length === 0) {
		return "Loading...";
	}
	if (Object.keys(movieDetails).length !== 0) {
		return (
			<>
				<div
					className="movieDetailsContainer"
					style={{
						backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}")`,
					}}
				>
					<div className="movieDetailsContainer-filter">
						<div className="movieDetails">
							<div className="poster_wrapper">
								{movieDetails.poster_path !== null ? (
									<img
										src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movieDetails.poster_path}`}
										alt="MoviePoster"
										className="poster"
									/>
								) : (
									""
								)}
							</div>
							<div className="information">
								<h1>{movieDetails.title || movieDetails.name}</h1>
								<h3>{movieDetails.original_title || movieDetails.original_name}</h3>
								{params.category === "movie" ? (
									<>
										<p>???????????? : {movieDetails.release_date}</p>
										<p>
											?????? : {Math.round(movieDetails.runtime / 60)}??????
											{movieDetails.runtime % 60}??????
										</p>
									</>
								) : (
									""
								)}
								<p>???????????? : </p>
								<p>{movieDetails.overview ? movieDetails.overview : "No Data"}</p>
								<p>?????? : </p>
								<div className="actorsList">
									{movieActors
										? movieActors.slice(0, 9).map((actor, index) => {
												return (
													<div key={index} className="actor">
														{actor.original_name}
													</div>
												);
										  })
										: "No Data"}
								</div>
								{isFound && isUserSignedIn ? (
									<button className="adding-btn" onClick={removeFromWatchList}>
										????????????
									</button>
								) : (
									<button className="adding-btn" onClick={addToWatchList}>
										????????????
									</button>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="detailbox">
					<div className="detailbox-container">
						<div className="info">
							<div className="title">
								<span>????????????</span>
							</div>
							<div className="actorBox">
								{movieActors[0]
									? movieActors.slice(0, 9).map((item, index) => {
											return (
												<MovieCard
													data-index={index}
													key={item.id}
													item={item}
													index={index}
												/>
											);
									  })
									: "No Data"}
							</div>
						</div>
						<div className="info">
							<div className="title">
								<span>????????????</span>
							</div>
							<div className="trailerBox">
								{movieTrailer[0]
									? movieTrailer.slice(0, 3).map((item, index) => {
											return (
												<div key={index}>
													<a
														href={`https://www.youtube.com/watch?v=${item.key}`}
														className="trailer"
														style={{
															backgroundImage: `url("https://i.ytimg.com/vi/${item.key}/hqdefault.jpg")`,
														}}
													></a>
												</div>
											);
									  })
									: "No Data"}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
};

export default MovieDetails;
