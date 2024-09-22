import { Text } from "@chakra-ui/react";
import React from "react";

function Priority({ ticket }) {
	switch (ticket.priority) {
		case "HIGH":
			return (
				<Text color={"red.500"} fontWeight={"extrabold"} fontSize={14}>
					HIGH
				</Text>
			);
		case "MEDIUM":
			return (
				<Text color={"yellow.500"} fontWeight={"extrabold"} fontSize={14}>
					MEDIUM
				</Text>
			);
		case "LOW":
			return (
				<Text color={"green.500"} fontWeight={"extrabold"} fontSize={14}>
					LOW
				</Text>
			);
		default:
			return <Text>-</Text>;
	}
}

export default Priority;
