import "./App.scss";
import Movies from "./view/Movies";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Router } from "@reach/router";
import Movie from "./view/Movie";
import Home from "./view/Home";
import { useEffect, useState } from "react";
import GlobalProvider from "./components/GlobalContext";
import useDatabase from './indexedDB';

function App() {
	var [searchResult, setSearchResult] = useState({});
	var [value, setValue] = useState("");
  var [db, setDB] = useState({});

  var {openScoreDB} = useDatabase();

  useEffect(() => {
    openScoreDB(result => {
      if (result.error) {
        console.log(result.error)
      }
      setDB(result);
    });
    // eslint-disable-next-line
  }, []);
    
  // useEffect(() => {
  //   if (db.name === "movie_score") {
  //     addScore("tt0948470", 3, err => {
  //       console.log("Error", err);
  //     });
  //     // getScore("tt7364587", result => {
  //     //   console.log(result);
  //     // });
  //   }
  //   // eslint-disable-next-line
  // }, [db]);
  
  return (
    <GlobalProvider value={{
      searchResult, setSearchResult,
      value, setValue,
      db, setDB
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
