import { useEffect, useState } from "react";
import "./Download.scss";

function Download(){
	var [deferredPrompt, setDeferredPrompt] = useState(null);

	async function download(){
		deferredPrompt.prompt();
		var {outcome} = await deferredPrompt.userChoice;
		console.log("Users response to the prompt: ", outcome);
		deferredPrompt = null;
	}

	useEffect(() => {
		window.addEventListener("beforeinstallprompt", e => {
			e.preventDefault();
			setDeferredPrompt(e);
			console.log("Install prompt has been deferred!");
		});
	}, []);

	return (
		<section className="Download">
			<h1 className="Download__title">Download App</h1>
			<button className="Download__button" onClick={download}>
				Download
				<svg className="Download__icon" viewBox="0 0 24 24"><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"></path></svg>
			</button>
		</section>
	);
}

export default Download;