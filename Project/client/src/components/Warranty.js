import { Tag } from "@chakra-ui/react";
import React from "react";

function Warranty({ endOfWarranty }) {
	const isExpired = new Date(endOfWarranty) < new Date();

	const colorScheme = isExpired ? "red" : "green";

	return (
		<Tag colorScheme={colorScheme} variant={"solid"} fontWeight={"bold"}>
			{isExpired ? "Expired" : "Active"}
		</Tag>
	);
}

export default Warranty;
