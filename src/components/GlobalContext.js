import { createContext, useContext } from "react";

var GlobalContext = createContext();

export function useGlobalContext(){
	return useContext(GlobalContext);
}

function GlobalProvider({children, value}){
	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	);
}

export default GlobalProvider;