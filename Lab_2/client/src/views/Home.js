import React from "react";
import Products from "../components/Products";
import Profiles from "../components/Profiles";
import "../App.css";

function Home() {
	return (
		<div className="main-container">
			<Products />
			<Profiles />
		</div>
	);
}

export default Home;
