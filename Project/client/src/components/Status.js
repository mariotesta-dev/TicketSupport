import { Tag } from "@chakra-ui/react";
import React from "react";

function Status({ status }) {
	const colorScheme = getColorScheme(status);

	return (
		<Tag colorScheme={colorScheme} variant={"solid"} fontWeight={"bold"}>
			{status}
		</Tag>
	);
}

function getColorScheme(status) {
	switch (status) {
		case "OPEN":
			return "blue";
		case "IN_PROGRESS":
			return "yellow";
		case "CLOSED":
			return "red";
		default:
			return "white";
	}
}

export default Status;
