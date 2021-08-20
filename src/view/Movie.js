import { useEffect, useState } from "react";
import { useGlobalContext } from "../components/GlobalContext";
import useDatabase from "../indexedDB";
import "./Movie.scss";

function Movie({id}){
	var [content, setContent] = useState({});
	var [score, setScore] = useState(0);
	var [hoverScore, setHoverScore] = useState(0);
	var {addScore, getScore, updateScore} = useDatabase();
	var {db} = useGlobalContext();

	function putScore(score){
		getScore(db, id, result => {
			if (result) {
				updateScore(db, id, score, result => {
					if (result.error) {
						console.log(result.error);
					}
					setScore(result.score);
				});
			} else {
				addScore(db, id, score, result => {
					if (result.error) {
						console.log(result.error);
					}
					setScore(result.score);
				});
			}
		});
	}

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
		if (db.name) {
			getScore(db, id, result => {
				if (result) {
					setScore(result.score);
				}
			});
		}
	}, [db, id, getScore]);
	
	return (
		<article className="Movie">
			<h1>{content.Title}</h1>
			{/* <p style={{margin: "1rem 0", fontWeight: "700", fontSize: "2rem"}}>imdb ID: {content.imdbID}</p> */}
			<p>{content.Plot}</p>
			<div className="Movie__flex">
				<img className="Movie__poster" src={content.Poster} alt={content.title} />
				<div className="Movie__ratings">
					<h2>Ratings:</h2>
					<ul className="Movie__ratings--list">
						{content.Ratings?.map(rating => <li key={rating.Source} className="Movie__ratings--listitem">
							<span className="Movie__ratings--source">{rating.Source}</span>
							{rating.Value}
						</li>)}
					</ul>
					<h2 style={{margin: "2rem 0 0.5rem"}}>User score:</h2>
					<div className="Movie__scores">
						{[1, 2, 3, 4, 5].map(s => (
							<button key={s} className="Movie__score" onClick={() => putScore(s)} onMouseEnter={() => setHoverScore(s)} onMouseLeave={() => setHoverScore(0)}>
								{(hoverScore > s - 1 || score > s - 1)
									? <svg style={{fill: hoverScore > s - 1 ? "orange" : null}} viewBox="0 0 24 24"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
									: <svg viewBox="0 0 24 24"><path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"></path></svg>}
							</button>
						))}
					</div>
				</div>
			</div>
		</article>
	);
}

export default Movie;