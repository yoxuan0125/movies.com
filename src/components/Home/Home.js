import axios from "axios";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import MovieCard from "../MovieCard/MovieCard";
import LeftArrow from "../images/left-arrow.svg";
import RightArrow from "../images/right-arrow.svg";

import "./Home.css";

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [hasMore, setHasMore] = useState(false);
	const [Top10Movies, setTop10Movies] = useState([]);
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
		{
			{
				setLoading(true);
				setError(false);
				let cancel;
				axios({
					method: "GET",
					url: `
			https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&language=zh-TW&sort_by=popularity.desc&with_watch_monetization_types=flatrate`,
					params: { page: 1 },
					cancelToken: new axios.CancelToken((c) => (cancel = c)),
				})
					.then((res) => {
						setHasMore(res.data.results.length > 0);
						setLoading(false);
						setTop10Movies(res.data.results.slice(0, 10));
					})
					.catch((e) => {
						if (axios.isCancel(e)) return;
						setError(true);
					});
				return () => cancel();
			}
		}
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
								<MovieCard data-index={index} key={item.id} item={item} index={index} />
							);
						})}
					</Slider>
				</div>
			</div>
		</div>
	);
};

export default Home;
