import { Tag } from "@chakra-ui/react";
import React from "react";

function Expertise({ expertise }) {
	const colorScheme = getColorScheme(expertise);

	return (
		<Tag colorScheme={colorScheme} variant={"solid"} fontWeight={"bold"}>
			{expertise.replace("_", " ")}
		</Tag>
	);
}

function getColorScheme(expertise) {
	switch (expertise) {
		case "INFORMATION":
			return "cyan";
		case "HARDWARE":
			return "yellow";
		case "MAINTENANCE":
			return "red";
		case "NETWORK":
			return "blue";
		case "OTHER":
			return "purple";
		case "SOFTWARE":
			return "green";
		case "PAYMENT_ISSUES":
			return "yellow";
		case "BUG_REPORTS":
			return "grey";
		default:
			return "white";
	}
}

export { Expertise, getColorScheme };
