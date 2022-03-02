import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
import { FaBars } from "react-icons/fa";
import "./Header.css";

const Header = () => {
	const [navOpen, setNavOpen] = useState(false);

	const navHandler = (e) => {
		e.preventDefault();
		setNavOpen(!navOpen);
	};

	return (
		<div className="header">
			<div className="nav-wrapper">
				<div className="nav">
					<Link to="/" className="logo">
						<h1>MOVIES</h1>
						<p>.com</p>
					</Link>
					<div className={navOpen ? `linksOpen` : `links`}>
						<ul className="category">
							<Link
								to="movie"
								onClick={() => {
									setNavOpen(!navOpen);
								}}
							>
								<li>熱門電影</li>
							</Link>
							<Link
								to="tv"
								onClick={() => {
									setNavOpen(!navOpen);
								}}
							>
								<li>電視節目</li>
							</Link>
							<li>更多</li>
						</ul>
					</div>
					<button className="nav-btn" onClick={navHandler}>
						<FaBars />
					</button>
					<div className="user-img">
						<a href="/user">
							<img src={user} alt="user" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
