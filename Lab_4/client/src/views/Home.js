import React from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Stack } from "@chakra-ui/react";

function Home() {
	return (
		<Stack>
			<Navbar />
			<Hero />
		</Stack>
	);
}

export default Home;
