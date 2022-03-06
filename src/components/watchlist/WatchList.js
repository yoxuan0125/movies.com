import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getwatchList, setwatchList } from "../../Redux/movies/movieSlice";
import { doc, setDoc } from "@firebase/firestore";
import { db, auth } from "../../firebase";
import MovieCard from "../MovieCard/MovieCard";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./watchlist.css";

const WatchList = () => {
	const navigate = useNavigate();
	const [isUserSignedIn, setIsUserSignedIn] = useState(false);

	//check if login
	auth.onAuthStateChanged((user) => {
		if (user) {
			return setIsUserSignedIn(true);
		}
		setIsUserSignedIn(false);
	});
	//get watch list
	const movieWatchList = useSelector(getwatchList);

	const userInfo = auth.currentUser;
	const dispatch = useDispatch();

	const clickHandler = (e) => {
		const id = e.target.parentElement.id;
		const newWatchList = movieWatchList.data.filter((movie) => movie.id !== id);
		console.log(newWatchList);
		setDoc(doc(db, "watchlist", userInfo.uid), {
			data: [...newWatchList],
		});
		dispatch(setwatchList({ data: [...newWatchList] }));
	};

	if (Object.keys(movieWatchList).length === 0) {
		alert("Please log in");
		window.location.href = "/";
	}
	if (Object.keys(movieWatchList).length !== 0) {
		return (
			<div className="watchlist-container">
				<h1>我的片單</h1>
				<div className="watchlist-wrapper">
					{movieWatchList.data.map((item, index) => {
						return (
							<div key={item.id} id={item.id}>
								<MovieCard item={item} index={index} className="MovieCard-container" />
								<button onClick={clickHandler} className="del-btn">
									<FaTrash />
								</button>
							</div>
						);
					})}
				</div>
			</div>
		);
	} else {
		window.location.href = "/";
		alert("please log in");
	}
};

export default WatchList;
