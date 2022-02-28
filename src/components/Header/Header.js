import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
import "./Header.css";

const Header = () => {
	return (
		<div className="header">
			<div className="nav-wrapper">
				<Link to="/" className="logo">
					<h1>MOVIES</h1>
					<p>.com</p>
				</Link>
				<div className="links">
					<ul>
						<Link to="movie">
							<li>熱門電影</li>
						</Link>
						<Link to="tv">
							<li>電視節目</li>
						</Link>

						<li>更多</li>
					</ul>
				</div>
			</div>

			<div className="user-img">
				<a href="/user">
					<img src={user} alt="user" />
				</a>
			</div>
		</div>
	);
};

export default Header;
