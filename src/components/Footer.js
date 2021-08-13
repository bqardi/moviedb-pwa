import "./Footer.scss";

function Footer(){
	return (
		<footer className="Footer">
			<address className="Footer__address">
				Made by <a rel="author" className="Footer__author" href="https://portfolio.bqardi.dk">Sune Seifert</a>
				, <time pubdate="pubdate" dateTime="2021-08-11" title="August 11th, 2021">August - 2021</time>
			</address>
		</footer>
	);
}

export default Footer;