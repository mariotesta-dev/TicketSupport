import { Center } from "@chakra-ui/react";
import React from "react";
import { useOutletContext } from "react-router-dom";

export default function DashHero() {
	const [user] = useOutletContext();
	return (
		<Center height={"full"} width={"full"}>
			<p>
				Welcome, <b>{user.name}</b>.
			</p>
		</Center>
	);
}
