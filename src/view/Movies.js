import "./Movies.scss";
import { Link } from "@reach/router";
import Card from "../components/Card";
import { useSearch } from "../App";
import Pagination, { usePagination } from "../components/Pagination";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

function Movies(){
	var {searchResult, setSearchResult} = useSearch();
	var [content, setContent] = useState({});
	var [loading, setLoading] = useState(false);
	var pagination = usePagination(content.totalResults, 10);

	function pageHandler(obj){
		setSearchResult(prev => ({
			...prev,
			page: obj.currentPage
		}));
	}

	useEffect(() => {
		if (searchResult.value) {
			setLoading(true);
			if (searchResult.page === 1) pagination.setCurrentPage(1);
			fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${searchResult.value}&page=${searchResult.page}&r=json`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-key": "cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a",
					"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
				}
			})
			.then(res => res.json())
			.then(data => {
				setLoading(false);
				setContent(data)
			})
			.catch(err => console.error(err));
		}
		// eslint-disable-next-line
	}, [searchResult]);

	return (
		<div className="Movies">
			<Pagination className="Pagination" pagination={pagination} onPage={pageHandler}>
				<div className="Pagination__mobile">
					{pagination.currentPage} / {pagination.totalPages}
				</div>
				<Pagination.First className="Pagination__desktop" />
				<Pagination.Previous />
				<Pagination.PageNumber className="Pagination__desktop" limit={pagination.totalPages > 5 ? 5 : (pagination.totalPages || 1)} />
				<Pagination.Next />
				<Pagination.Last className="Pagination__desktop" />
			</Pagination>
			<div className="Movies__cards">
				{loading && <div className="Movies__loading">
					<Loading size={128}>
						<Loading.DotFade />
					</Loading>
				</div>}
				{!loading ? content.Search?.length > 0 ? content.Search?.map(result =>
					<Link to={`/movies/${result.imdbID}`} key={result.imdbID} className="Movies__link">
						<Card>
							<Card.Image src={result.Poster} alt={result.Title} />
							<h2 className="Movies__title">{result.Title}</h2>
						</Card>
					</Link>
				) : "No movie(s) found!" : null}
			</div>
		</div>
	);
}

export default Movies;