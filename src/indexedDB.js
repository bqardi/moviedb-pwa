function useDatabase(){

	function openScoreDB(callback){
		if (!window.indexedDB) {
			console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
			return;
		}
		
		const dbName = "movie_score";
		
		var request = indexedDB.open(dbName, 1);
		
		request.onupgradeneeded = function(e) {
			var thisDB = e.target.result;
			var store = thisDB.createObjectStore("scores", { keyPath: "key", autoIncrement: true });
			store.createIndex("id", "id", { unique: true });
			store.createIndex("score", "score", { unique: false });
			console.log("Created")
		};
		request.onerror = function(e) {
			callback({error: "Why didn't you allow my web app to use IndexedDB?!"});
		};
		request.onsuccess = function(e) {
			callback(e.target.result);
			console.log("Opened")
		};
	}
	
	function addScore(db, id, score, callback = null){
		var transaction = db.transaction(["scores"], "readwrite");
		var store = transaction.objectStore("scores");
	
		var request = store.add({id, score});
	
		request.onerror = function(e){
			if (!callback) {
				return;
			}
			callback({error: "Something went wrong!", event: e});
		};
	
		request.onsuccess = function(e){
			if (!callback) {
				return;
			}
			callback({id, score});
		};
	}
	
	function updateScore(db, id, score, callback){
		var transaction = db.transaction(["scores"], "readwrite");
		var store = transaction.objectStore("scores");
		var index = store.index("id");

		var request = index.get(id);

		request.onsuccess = function(e) {
			var result = e.target.result;
			if (score !== undefined) {
				result.score = score;
				var requestUpdate = store.put(result);
				requestUpdate.onerror = function(event) {
					callback({error: "Something went wrong!", event});
				};
				requestUpdate.onsuccess = function(event) {
					callback({id, score});
				};
				return;
			}
			callback({error: "Score value undefined!", event: e});
		}
		request.onerror = function(e){
			callback({error: "Something went wrong!", event: e});
		}
	}
	
	function getScore(db, id, callback){
		var transaction = db.transaction(["scores"], "readonly");
		var store = transaction.objectStore("scores");
		var index = store.index("id");

		var request = index.get(id);

		request.onsuccess = function(e) {
			var result = e.target.result;
			callback(result);
		}
		request.onerror = function(e){
			callback(null);
		}
	}

	return {
		openScoreDB,
		addScore,
		updateScore,
		getScore
	}
}

export default useDatabase;