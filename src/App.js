import "./App.scss";
import Movies from "./view/Movies";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Router } from "@reach/router";
import Movie from "./view/Movie";
import Home from "./view/Home";
import { useState } from "react";
import GlobalProvider from "./components/GlobalContext";

function App() {
	var [searchResult, setSearchResult] = useState({});
	var [value, setValue] = useState("");
  
  return (
    <GlobalProvider value={{
      searchResult, setSearchResult,
      value, setValue
    }}>
      <div className="App">
        <Router>
          <Header path="/" />
          <Header to="/" default />
          <Header path="/movies/:id" to="/movies" />
        </Router>
        <div className="App__fill">
          <Router>
            <Home path="/" />
            <Movies path="/movies" />
            <Movie path="/movies/:id" />
          </Router>
        </div>
        <Footer />
      </div>
    </GlobalProvider>
  );
}

export default App;
