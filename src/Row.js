import React, { useState, useEffect } from 'react';
import axios from './axios';
// axios is the 'instance' we created in axios.js. since you exported it as a default, you can name it whatever you want when you import it. but if you didn't export it as a default, you would have to import it like this: import { instance } from './axios';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL }) {
    const [movies, setMovies] = useState([]);

    // A snippet of code which runs based on a specific condition/variable
    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);
    // you must include fetchURL in the bracket, otherwise it will not run. it's a dependency. it's saying, "hey, this variable is being pulled from outside the block, so you need to include it in the bracket so that it knows to run every time the variable changes."
    // if [] (bracket is empty), run once when the row loads, and don't run again. but if there isa  variable in the bracket, it will run every time the variable changes. it's dependent on that.
    console.table(movies);


    return (
    <div className="row">
        <h2>{ title }</h2>

        <div className="row__posters">
            { /* several row__poster(s) */ }

            {movies.map(movie => (
                <img 
                    className="row_poster"
                    src={`${base_url}${movie.poster_path}`}
                    alt={movie.name}
                />
                // needed base_url because the poster_path is only the end of the url. it's not the full url.
            ))}
        </div>
    </div>
    )
}

export default Row;