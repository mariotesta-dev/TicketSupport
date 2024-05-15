import { Tag } from "@chakra-ui/react";
import React from "react";

function Warranty({ endOfWarranty, isActivated }) {
	if (endOfWarranty === null || !isActivated) {
		return (
			<Tag colorScheme={"gray"} variant={"solid"} fontWeight={"bold"}>
				Not activated
			</Tag>
		);
	}

	const isExpired = new Date(endOfWarranty) < new Date();

	var colorScheme = isExpired ? "red" : "green";
	colorScheme = isActivated ? colorScheme : "gray";

	return (
		<Tag colorScheme={colorScheme} variant={"solid"} fontWeight={"bold"}>
			{isExpired ? "Expired" : "Active"}
		</Tag>
	);
}

export default Warranty;
