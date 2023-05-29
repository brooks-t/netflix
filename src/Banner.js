import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
// import "./Banner.css";

function Banner() {
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);
			setMovie(
				request.data.results[
					Math.floor(Math.random() * request.data.results.length - 1)
				]
			);
			return request;
		}
		fetchData();
	}, []);

	console.log(movie);

	return (
		<header
			className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
				/* the question mark above is called optional chaining. it's saying, "hey, if there is no movie, then don't freak out. just keep going." */
				backgroundPosition: "center center",
			}}
		>
			<div className="banner__contents"></div>
			<h1>{movie?.title || movie?.name || movie?.original_name}</h1>
			<div className="banner__buttons">
				<button className="banner__button">Play</button>
				<button className="banner__button">My List</button>
			</div>
			<h1 className="banner__description">{movie?.overview}</h1>
		</header>
	);
}

export default Banner;
