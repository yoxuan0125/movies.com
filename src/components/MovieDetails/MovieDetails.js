import React from "react";
import useMovieDetailsSearch from "../../common/apis/movieDetailApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMovieDetails } from "../../Redux/movies/movieSlice";
import "./MovieDetails.css";

const MovieDetails = () => {
	const params = useParams();
	useMovieDetailsSearch(params.id);
	const movieDetails = useSelector(getMovieDetails);
	console.log(movieDetails);

	return (
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
						<h1>{movieDetails.title}</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetails;
