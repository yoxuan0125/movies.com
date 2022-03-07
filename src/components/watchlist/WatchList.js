import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getwatchList, setwatchList } from "../../Redux/movies/movieSlice";
import { doc, setDoc } from "@firebase/firestore";
import { db, auth } from "../../firebase";
import MovieCard from "../MovieCard/MovieCard";
import { FaTrash } from "react-icons/fa";

import "./watchlist.css";

const WatchList = () => {
	//get watch list
	const movieWatchList = useSelector(getwatchList);

	const userInfo = auth.currentUser;
	const dispatch = useDispatch();

	const clickHandler = (e) => {
		const id = e.target.parentElement.id;
		console.log(e.target.parentElement);
		const newWatchList = movieWatchList.data.filter((movie) => movie.id !== id);

		setDoc(doc(db, "watchlist", userInfo.uid), {
			data: [...newWatchList],
		});
		dispatch(setwatchList({ data: [...newWatchList] }));
	};

	if (Object.keys(movieWatchList).length === 0 && auth.currentUser === null) {
		alert("Please log in");
		window.location.href = "/";
	}
	if (Object.keys(movieWatchList).length !== 0 && auth.currentUser) {
		return (
			<div className="watchlist-container">
				<h1>我的片單</h1>
				{!movieWatchList.data.length ? <h2>尚未有待看清單</h2> : null}
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
