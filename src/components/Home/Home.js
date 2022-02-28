import axios from "axios";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import MovieCard from "../MovieCard/MovieCard";
import LeftArrow from "../images/left-arrow.svg";
import RightArrow from "../images/right-arrow.svg";
import {
	setMovieDetails,
	setmovieActors,
	setmovieTrailer,
} from "../../Redux/movies/movieSlice";
import { useDispatch } from "react-redux";

import "./Home.css";

const Home = () => {
	const dispatch = useDispatch();
	const [Top10Movies, setTop10Movies] = useState([]);
	const [Top10TVShows, setTop10TVShows] = useState([]);
	const APIKey = "55d94f60e799bfe097c0411107134875";

	//Slider Settings
	const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
		<img src={LeftArrow} alt="prevArrow" {...props} />
	);

	const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
		<img src={RightArrow} alt="nextArrow" {...props} />
	);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		prevArrow: <SlickArrowLeft />,
		nextArrow: <SlickArrowRight />,
	};

	//Get TOP10 movies
	useEffect(() => {
		dispatch(setMovieDetails([]));
		dispatch(setmovieActors([]));
		dispatch(setmovieTrailer([]));
		const url = (c) =>
			`https://api.themoviedb.org/3/discover/${c}?api_key=${APIKey}&language=zh-TW&sort_by=popularity.desc&with_watch_monetization_types=flatrate`;

		let endpoints = [url("tv"), url("movie")];

		axios
			.all(endpoints.map((endpoint) => axios.get(endpoint)))
			.then((data) => {
				setTop10TVShows(data[0].data.results.slice(0, 10));
				setTop10Movies(data[1].data.results.slice(0, 10));
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return (
		<div className="main-container">
			<div className="banner">
				<div className="banner-filter">
					<div className="banner-title">
						<h2>歡迎！ </h2>
						<h3>上百萬部電影、電視節目和人物在等你探索。立即瀏覽吧！</h3>
					</div>
				</div>
			</div>
			<div>
				<div className="column-header">TOP10 熱門電影</div>
				<div className="carousel">
					<Slider {...settings}>
						{Top10Movies.map((item, index) => {
							return (
								<MovieCard
									data-index={index}
									key={item.id}
									item={item}
									index={index}
									category={"movie"}
								/>
							);
						})}
					</Slider>
				</div>
				<div className="column-header">TOP10 熱門影集</div>
				<div className="carousel">
					<Slider {...settings}>
						{Top10TVShows.map((item, index) => {
							return (
								<MovieCard
									data-index={index}
									key={item.id}
									item={item}
									index={index}
									category={"tv"}
								/>
							);
						})}
					</Slider>
				</div>
			</div>
		</div>
	);
};

export default Home;
