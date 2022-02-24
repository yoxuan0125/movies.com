import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";

function App() {
	return (
		<div className="App">
			<Router>
				<Header></Header>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/movie/:omdbID" element={<MovieDetails />}></Route>
					<Route path="/movies" element={<MovieList category={"movie"} />}></Route>
					<Route path="/tv" element={<MovieList category={"tv"} />}></Route>
					<Route path="*" element={<PageNotFound />}></Route>
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
