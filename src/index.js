
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

Notification.requestPermission(function(status) {
  console.log("Notification permission status: ", status)
});

if ("serviceWorker" in navigator) {
	window.addEventListener("load", e => {
		navigator.serviceWorker.register("/sw.js").then(registration => {
			console.log("Juhuu, SW registered successfully!", registration);
		}, error => {
			console.log("Something went poopy!", error);
		});
	})
}