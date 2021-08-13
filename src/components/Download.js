import { useEffect, useState } from "react";
import "./Download.scss";

function Download(){
	var [supportsPWA, setSupportsPWA] = useState(false);
	var [deferredPrompt, setDeferredPrompt] = useState(null);

	useEffect(() => {
		function installHandler(e) {
			e.preventDefault();
			setSupportsPWA(true);
			setDeferredPrompt(e);
			console.log("Install prompt has been deferred!");
		};
		window.addEventListener("beforeinstallprompt", installHandler);
		return () => window.removeEventListener("beforeinstallprompt", installHandler);
	}, []);

	async function download(e){
		e.preventDefault();
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		var {outcome} = await deferredPrompt.userChoice;
		console.log("Users response to the prompt: ", outcome);
		deferredPrompt = null;
	}

	if (!supportsPWA) return null;

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