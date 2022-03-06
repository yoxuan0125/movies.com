import React from "react";
import { useSelector } from "react-redux";
import { getwatchList, setwatchList } from "../../Redux/movies/movieSlice";
import { doc, setDoc } from "@firebase/firestore";
import { db, auth } from "../../firebase";
import { useDispatch } from "react-redux";
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
		const newWatchList = movieWatchList.data.filter((movie) => movie.id !== id);
		console.log(newWatchList);
		setDoc(doc(db, "watchlist", userInfo.uid), {
			data: [...newWatchList],
		});
		dispatch(setwatchList({ data: [...newWatchList] }));
	};

	if (movieWatchList) {
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
	}
};

export default WatchList;
