import Search from "./Search";
import "./Header.scss";
import { Link } from "@reach/router";

function Header({to}){
	return (
		<header className="Header">
			{to
				? <Link to={to} className="Header__link">
						<svg className="Header__icon" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
					</Link>
				: null}
			<Search />
		</header>
	);
}

export default Header;