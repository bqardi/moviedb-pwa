import Download from "../components/Download";
import "./Home.scss";

function Home(){
	return (
		<main className="Home">
			<Download />
			<div className="Home__onboarding">
				Search the movie database, up here
				<svg className="Home__arrow" viewBox="0 0 24 24"><path d="M19,15L13,21L11.58,19.58L15.17,16H4V4H6V14H15.17L11.58,10.42L13,9L19,15Z"></path></svg>
			</div>
		</main>
	);
}

export default Home;