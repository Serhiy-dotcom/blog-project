import React from "react";
import "./Header.css";

import { useHistory } from "react-router-dom";

function Header() {
	const history = useHistory();

	return (
		<div className="header">
			<div className="header_home" onClick={() => history.push("/")}>
				Home
			</div>
			<div
				className="header_create"
				onClick={() => history.push("/create_post")}
			>
				Create Post
			</div>
		</div>
	);
}

export default Header;
