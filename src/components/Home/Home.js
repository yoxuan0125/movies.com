import React from "react";
import MovieList from "../MovieList/MovieList";
import axios from "axios";
import "./Home.css";

const Home = () => {
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
		</div>
	);
};

export default Home;
