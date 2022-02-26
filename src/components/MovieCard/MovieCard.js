import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";

const MovieCard = React.forwardRef((props, ref) => {
	return (
		<div key={props.index}>
			<Link to={`/movies/${props.item.id}`} className="moviecard">
				<img
					src={`https://image.tmdb.org/t/p/original${props.item.poster_path}`}
					alt="error"
					className="movieimg"
				/>
				<div className="moviecontent">
					<h4>{props.item.title || props.item.name}</h4>
					<h6>{props.item.original_title || props.item.original_name}</h6>
					<p ref={ref}>{props.item.release_date}</p>
				</div>
			</Link>
		</div>
	);
});

export default MovieCard;
