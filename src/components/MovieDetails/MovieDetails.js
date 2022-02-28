import React from "react";
import useMovieDetailsSearch from "../../common/apis/movieDetailApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	getMovieDetails,
	getMovieActors,
	getMovieTrailer,
} from "../../Redux/movies/movieSlice";
import "./MovieDetails.css";

import MovieCard from "../MovieCard/MovieCard";

const MovieDetails = () => {
	const params = useParams();
	useMovieDetailsSearch(params.id, params.category);
	const movieDetails = useSelector(getMovieDetails);
	const movieActors = useSelector(getMovieActors);
	const movieTrailer = useSelector(getMovieTrailer);

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
							<img
								src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movieDetails.poster_path}`}
								alt="MoviePoster"
								className="poster"
							/>
						</div>
						<div className="information">
							<h1>{movieDetails.title || movieDetails.name}</h1>
							<h3>{movieDetails.original_title || movieDetails.original_name}</h3>
							{params.category == "movie" ? (
								<>
									<p>上映日期 : {movieDetails.release_date}</p>
									<p>
										片長 : {Math.round(movieDetails.runtime / 60)}小時
										{movieDetails.runtime % 60}分鐘
									</p>
								</>
							) : (
								""
							)}
							<p>劇情介紹 : </p>
							<p>{movieDetails.overview}</p>
							<p>演員 : </p>
							<div className="actorsList">
								{movieActors.cast
									? movieActors.cast.slice(0, 9).map((actor, index) => {
											return (
												<div key={index} className="actor">
													{actor.original_name}
												</div>
											);
									  })
									: ""}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="detailbox">
				<div className="detailbox-container">
					<div className="info">
						<div className="title">
							<span>主要演員</span>
						</div>
						<div className="actorBox">
							{movieActors.cast
								? movieActors.cast.slice(0, 9).map((item, index) => {
										return (
											<MovieCard
												data-index={index}
												key={item.id}
												item={item}
												index={index}
											/>
										);
								  })
								: ""}
						</div>
					</div>
					<div className="info">
						<div className="title">
							<span>精彩影片</span>
						</div>
						<div className="trailerBox">
							{movieTrailer
								? movieTrailer.slice(0, 2).map((item, index) => {
										return (
											<a
												href={`https://www.youtube.com/watch?v=${item.key}`}
												className="trailer"
												style={{
													backgroundImage: `url("https://i.ytimg.com/vi/${item.key}/hqdefault.jpg")`,
												}}
											></a>
										);
								  })
								: ""}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MovieDetails;
