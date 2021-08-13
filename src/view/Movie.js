import { useEffect, useState } from "react";
import "./Movie.scss";

function Movie({id}){
	var [content, setContent] = useState({});

	useEffect(() => {
		fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${id}&r=json`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a",
				"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
			}
		})
		.then(res => res.json())
		.then(data => setContent(data))
		.catch(err => {
			console.error(err);
		});
	}, [id]);

	useEffect(() => {
		console.log(content);
	}, [content]);
	
	return (
		<article className="Movie">
			<h1>{content.Title}</h1>
			<p>{content.Plot}</p>
			<img className="Movie__poster" src={content.Poster} alt={content.title} />
			<div className="Movie__ratings">
				<h2>Ratings:</h2>
				<ul className="Movie__ratings--list">
					{content.Ratings?.map(rating => <li key={rating.Source} className="Movie__ratings--listitem">
						<span className="Movie__ratings--source">{rating.Source}</span>
						{rating.Value}
					</li>)}
				</ul>
			</div>
		</article>
	);
}

export default Movie;