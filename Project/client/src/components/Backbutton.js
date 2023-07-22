import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

function Backbutton({ href }) {
	return (
		<Button
			as="a"
			position={"absolute"}
			top={"20px"}
			left={"20px"}
			leftIcon={<ArrowBackIcon />}
			colorScheme="blue"
			variant="outline"
			href={href}>
			Back
		</Button>
	);
}

export default Backbutton;
