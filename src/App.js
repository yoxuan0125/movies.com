import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import UserPage from "./components/UserPage/UserPage";

function App() {
	return (
		<div className="App">
			<Router>
				<Header></Header>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/:category/:id" element={<MovieDetails />}></Route>
					<Route path="/movie" element={<MovieList category={"movie"} />}></Route>
					<Route path="/tv" element={<MovieList category={"tv"} />}></Route>
					<Route path="/:category/:id" element={<MovieDetails />}></Route>
					<Route path="/user" element={<UserPage />}></Route>
					<Route path="*" element={<PageNotFound />}></Route>
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
